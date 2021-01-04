# String Metric

A library implementing different string similarity and distance measures, and Implement by **TypeScript**. Also, you can use in **JavaScript**.

Algorithm reference [java-string-similarity](https://github.com/tdebatty/java-string-similarity)

## Install

`npm install string-metric`

## Progress

| Algorithm                         | Complete? |
| --------------------------------- | --------- |
| [Jaro-Winkler](#Jaro-Winkler)     | Yes       |
| Levenshtein                       | No        |
| Normalized Levenshtein            | No        |
| Weighted Levenshtein              | No        |
| Damerau-Levenshtein               | No        |
| Optimal String Alignment          | No        |
| Longest Common Subsequence        | No        |
| Metric Longest Common Subsequence | No        |
| N-Gram                            | No        |
| Q-Gram                            | No        |
| Shingle (n-gram) based algorithms | No        |
| Cosine similarity                 | No        |
| Jaccard index                     | No        |
| Sorensen-Dice coefficient         | No        |
| Ratcliff-Obershelp                | No        |

## Jaro-Winkler

For more specs, please go to `tests/JaroWinkler.spec.ts` in the repository.

```typescript
const instance = new JaroWinkler();

const s1 = 'My string';
const s2 = 'My string';
instance.similarity(s1, s2); // 1

const s1 = 'My string';
const s2 = 'My tsring';
instance.similarity(s1, s2); // 0.974074

const s1 = 'My string';
const s2 = 'My ntrisg';
instance.similarity(s1, s2); // 0.896296
```
