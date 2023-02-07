# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

Firts I added some test cases for the presence/absense of a partitionKey and then for the event's type.

In order to do so, it was important to extract the hash function, since it was used in more than one place and even in the test suite.

Then I broke the logic blocks into sessions of logic.

First logic regarding the event, extracting the candidate from it.

Later logic, validating the candidate and returning a valid one.

This way, the method deterministicPartitionKey was reduced to one line, the hash was in one place, easily maintanable and the extraction/validation logics were also in their own place.

It got easy to understand the default's and when there was a transformation occuring and why.

Without nesting if's, it's easier to understand the logic flow and keep it more maintanable.
