# String Metric

[![Build Status](https://travis-ci.com/hellojayjay/string-metric.svg?branch=master)](https://travis-ci.com/hellojayjay/string-metric) [![Coverage Status](https://coveralls.io/repos/github/hellojayjay/string-metric/badge.svg?branch=master)](https://coveralls.io/github/hellojayjay/string-metric?branch=master)
![npm](https://img.shields.io/npm/dm/string-metric)
![npm](https://img.shields.io/npm/v/string-metric)

A library implementing different string similarity and distance measures, and Implement by **TypeScript**. Also, you can use in **JavaScript**.

Algorithm reference [java-string-similarity](https://github.com/tdebatty/java-string-similarity)

## Install

`npm install string-metric`

## Progress

| Algorithm                                         | Complete? |
| ------------------------------------------------- | --------- |
| [Jaro-Winkler](#Jaro-Winkler)                     | Yes       |
| [Levenshtein](#Levenshtein)                       | Yes       |
| [Normalized-Levenshtein](#Normalized-Levenshtein) | Yes       |
| [Weighted-Levenshtein](#Weighted-Levenshtein)     | Yes       |
| [Damerau](#Damerau)                               | Yes       |
| [Optimal-String-Alignment](#Optimal-String-Alignment)     |Yes|
| [Longest-Common-Subsequence](#Longest-Common-Subsequence) | Yes     |
| [Metric-Longest-Common-Subsequence](#Metric-Longest-Common-Subsequence) | Yes     |
| [N-Gram](#N-Gram)                                 | Yes     |
| Q-Gram                                            | No        |
| Shingle (n-gram) based algorithms                 | No        |
| Cosine similarity                                 | No        |
| Jaccard index                                     | No        |
| Sorensen-Dice coefficient                         | No        |
| Ratcliff-Obershelp                                | No        |

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

## Levenshtein

For more specs, please go to `tests/Levenshtein.spec.ts` in the repository.

```typescript
const instance = new Levenshtein();

const s1 = 'My string';
const s2 = 'My string';
instance.distance(s1, s2); // 0

const s1 = 'My string';
const s2 = 'My tring';
instance.distance(s1, s2); // 1

const s1 = 'My string';
const s2 = 'M string2';
instance.distance(s1, s2); // 2
```

## Normalized-Levenshtein

For more specs, please go to `tests/NormalizedLevenshtein.spec.ts` in the repository.

```typescript
const instance = new NormalizedLevenshtein();
```

## Weighted-Levenshtein

For more specs, please go to `tests/WeightedLevenshtein.spec.ts` in the repository.

```typescript
const instance = new WeightedLevenshtein();
```

## Damerau

For more specs, please go to `tests/Damerau.spec.ts` in the repository.

```typescript
const instance = new Damerau();

const s1 = 'ABCDEF';
const s2 = 'ABDCEF';
instance.distance(s1, s2); // 1

const s1 = 'ABCDEF';
const s2 = 'BACDFE';
instance.distance(s1, s2); // 2

const s1 = 'ABCDEF';
const s2 = 'ABCDE';
instance.distance(s1, s2); // 1
```

## Optimal-String-Alignment

For more specs, please go to `tests/OptimalStringAlignment.spec.ts` in the repository.

```typescript
const instance = new OptimalStringAlignment();

const s1 = 'ABDCEF';
const s2 = 'ADCEF';
instance.distance(s1, s2); // 1

const s1 = 'BAC';
const s2 = 'CAB';
instance.distance(s1, s2); // 2

const s1 = 'CA';
const s2 = 'ABC';
instance.distance(s1, s2); // 3
```

## Longest-Common-Subsequence

For more specs, please go to `tests/LongestCommonSubsequence.spec.ts` in the repository.

```typescript
const instance = new LongestCommonSubsequence();

const s1 = 'AGCAT';
const s2 = 'GAC';
instance.distance(s1, s2); // 4

const s1 = 'AGCAT';
const s2 = 'AGCT';
instance.distance(s1, s2); // 1
```

## Metric-Longest-Common-Subsequence

For more specs, please go to `tests/MetricLCS.spec.ts` in the repository.

```typescript
const instance = new MetricLCS();
```

## N-Gram

For more specs, please go to `tests/NGram.spec.ts` in the repository.

```typescript
const instance = new NGram();

const s1 = 'SIJK';
const s2 = 'SIJK';
instance.distance(s1, s2); // 0

const s0 = 'ABABABAB';
const s1 = 'ABCABCABCABC';
const s2 = 'POIULKJH';
instance.distance(s0, s1) < instance.distance(s0, s2); // true
```

