const crypto = require("crypto");

//Promoted level consts to be used in many places
const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

//Extracted the hash function to it's own method, for maintenance sake, hence it appears in more than one place
function hexHash(data) {
  return crypto.createHash("sha3-512").update(data).digest("hex");
}

//Extracted the first conditionals block assigning the first candidate's value from event
function extractCandidateFromEvent(event) {
  //no event
  if (!event) return null;

  //partitionKey present
  if (event.partitionKey) {
    return event.partitionKey;
  }

  //default stringification of the event param
  const data = JSON.stringify(event);
  return hexHash(data);
}

//Extracted the second conditionals block validating the candidate
function validateCandidate(candidate) {
  //must be non empty
  if (!candidate) return TRIVIAL_PARTITION_KEY;

  //must be string
  if (typeof candidate !== "string") {
    candidate = JSON.stringify(candidate);
  }

  //must be bellow MAX_PARTITION_KEY_LENGTH
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = hexHash(candidate);
  }

  return candidate;
}

exports.deterministicPartitionKey = (event) => {
  return validateCandidate(extractCandidateFromEvent(event));
};

exports.hexHash = hexHash;
