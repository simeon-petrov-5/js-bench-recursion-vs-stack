# Windows 10 & Intel i7-10750H

## Node v22.14.0

```
clk: ~2.17 GHz
cpu: Intel(R) Core(TM) i7-10750H CPU @ 2.60GHz
runtime: node 22.14.0 (x64-win32)
```

### Execution Time

| Benchmark   | Avg (min … max) | p75 / p99 | (min … top 1%) |
|------------|----------------|------------|----------------|
| **Recursion** | 86.65 µs/iter | 112.10 µs | (29.10 µs … 693.00 µs) |
| **RecursionV2** | 15.42 µs/iter | 15.40 µs | (13.50 µs … 130.90 µs) |
| **Stack** | 108.14 µs/iter | 127.10 µs | (43.20 µs … 810.20 µs) |
| **StackV2** | 27.13 µs/iter | 24.50 µs | (17.40 µs … 243.30 µs) |

### Memory Usage
| Benchmark   | Memory (min … max) | Top 1% |
|------------|---------------------|--------|
| **Recursion** | (0.00 b … 344.28 kb) | 93.30 kb |
| **RecursionV2** | (1.27 kb … 97.30 kb) | 1.48 kb |
| **Stack** | (13.09 kb … 333.75 kb) | 106.73 kb |
| **StackV2** | (1.86 kb … 153.96 kb) | 2.07 kb |

### Performance Summary
- **RecursionV2**  
  - 1.76× faster than **StackV2**  
  - 5.62× faster than **Recursion**  
  - 7.01× faster than **Stack**  

<details>
  <summary>📑 Mitata logs - node</summary>

```
benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
Recursion                     86.65 µs/iter 112.10 µs █  
                     (29.10 µs … 693.00 µs) 566.50 µs █  
                    (  0.00  b … 344.28 kb)  93.30 kb █▄▂▆▅▁▁▁▁▁▁▁▁▁▁▁▁▂▁▁▁

RecursionV2                   15.42 µs/iter  15.40 µs   █  
                     (13.50 µs … 130.90 µs)  23.00 µs  ▅█▂ 
                    (  1.27 kb …  97.30 kb)   1.48 kb ▁████▅▄▂▁▁▁▁▁▁▂▂▂▁▁▁▁

Stack                        108.14 µs/iter 127.10 µs █  
                     (43.20 µs … 810.20 µs) 571.50 µs █  
                    ( 13.09 kb … 333.75 kb) 106.73 kb ██▆█▇▂▁▁▁▁▁▁▁▁▁▁▂▂▂▁▁

StackV2                       27.13 µs/iter  24.50 µs   █▅ 
                     (17.40 µs … 243.30 µs)  64.40 µs   ██ 
                    (  1.86 kb … 153.96 kb)   2.07 kb ▅▁██▂▄▂▁▁▁▁▁▁▁▁▁▁▃▂▂▁

summary
  RecursionV2
   1.76x faster than StackV2
   5.62x faster than Recursion
   7.01x faster than Stack
```
</details>

## BUN v1.2.4

```
clk: ~1.46 GHz
cpu: Intel(R) Core(TM) i7-10750H CPU @ 2.60GHz
runtime: bun 1.2.4 (x64-win32)
```

### Execution Time
| Benchmark   | Avg (min … max) | p75 / p99 | (min … top 1%) |
|------------|----------------|------------|----------------|
| **Recursion** | 53.90 µs/iter | 55.30 µs | (48.40 µs … 116.50 µs) |
| **RecursionV2** | 9.17 µs/iter | 9.26 µs | (8.95 µs … 9.63 µs) |
| **Stack** | 163.59 µs/iter | 165.40 µs | (156.30 µs … 251.50 µs) |
| **StackV2** | 25.08 µs/iter | 27.70 µs | (21.60 µs … 91.40 µs) |

### Memory Usage
| Benchmark   | GC Time (min … max) | Top 1% GC Time | Memory (min … max) |
|------------|----------------------|---------------|---------------------|
| **Recursion** | (1.10 ms … 5.48 ms) | 721.76 b | (0.00 b … 64.00 kb) |
| **RecursionV2** | (1.83 ms … 3.79 ms) | 1.12 kb | (1.09 kb … 1.31 kb) |
| **Stack** | (1.08 ms … 4.74 ms) | 205.27 b | (0.00 b … 36.00 kb) |
| **StackV2** | (1.03 ms … 5.33 ms) | 90.47 b | (0.00 b … 16.00 kb) |

### Performance Summary
- **RecursionV2**  
  - **2.74×** faster than **StackV2**  
  - **5.88×** faster than **Recursion**  
  - **17.84×** faster than **Stack**  


<details>
  <summary>📑 Mitata logs - bun</summary>

```
benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
Recursion                     53.90 µs/iter  55.30 µs ██ 
                     (48.40 µs … 116.50 µs) 100.70 µs ██▂▇▂▁▂▂▁▁▁▁▁▁▁▁▁▁▁▁▁
                  gc(  1.10 ms …   5.48 ms) 721.76  b (  0.00  b… 64.00 kb)

RecursionV2                    9.17 µs/iter   9.26 µs  ▄█    
                        (8.95 µs … 9.63 µs)   9.62 µs ▃██▃▃▇▅▁▁▅▃▁▁▅▁▃▅▁▁▁▃
                  gc(  1.83 ms …   3.79 ms)   1.12 kb (  1.09 kb…  1.31 kb)

Stack                        163.59 µs/iter 165.40 µs  ▅▂ ▂█▂
                    (156.30 µs … 251.50 µs) 189.30 µs ▆██▃███▄▂▂▁▁▁▁▁▁▁▁▁▁▁
                  gc(  1.08 ms …   4.74 ms) 205.27  b (  0.00  b… 36.00 kb)

StackV2                       25.08 µs/iter  27.70 µs █   
                      (21.60 µs … 91.40 µs)  48.40 µs █▇▂▁▁▃▁▃▂▁▁▁▁▁▁▁▁▁▁▁▁
                  gc(  1.03 ms …   5.33 ms)  90.47  b (  0.00  b… 16.00 kb)

summary
  RecursionV2
   2.74x faster than StackV2
   5.88x faster than Recursion
   17.84x faster than Stack
```
</details>

## DENO v2.2.2

```
clk: ~3.87 GHz
cpu: Intel(R) Core(TM) i7-10750H CPU @ 2.60GHz
runtime: deno 2.2.2 (x86_64-pc-windows-msvc)
```

### Execution Time
| Benchmark   | Avg (min … max) | p75 / p99 | (min … top 1%) |
|------------|----------------|------------|----------------|
| **Recursion** | 239.88 µs/iter | 115.50 µs | (32.20 µs … 2.33 ms) |
| **RecursionV2** | 20.66 µs/iter | 23.00 µs | (14.20 µs … 2.17 ms) |
| **Stack** | 272.24 µs/iter | 132.80 µs | (49.00 µs … 2.02 ms) |
| **StackV2** | 35.24 µs/iter | 40.70 µs | (17.60 µs … 1.29 ms) |

### Memory Usage
| Benchmark   | Memory (min … max) | Top 1% Memory |
|------------|---------------------|--------------|
| **Recursion** | (600.00 b … 322.43 kb) | 91.36 kb |
| **RecursionV2** | (1.54 kb … 102.68 kb) | 1.89 kb |
| **Stack** | (888.00 b … 331.87 kb) | 103.48 kb |
| **StackV2** | (1.78 kb … 145.84 kb) | 2.31 kb |

### Performance Summary
- **RecursionV2**  
  - **1.71×** faster than **StackV2**  
  - **11.61×** faster than **Recursion**  
  - **13.17×** faster than **Stack**  

<details>
  <summary>📑 Mitata logs - deno</summary>

```
benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
Recursion                    239.88 µs/iter 115.50 µs █   
                       (32.20 µs … 2.33 ms)   1.58 ms █▅  
                    (600.00  b … 322.43 kb)  91.36 kb ██▂▁▁▁▁▁▁▂▂▁▁▁▁▁▁▂▃▂▁

RecursionV2                   20.66 µs/iter  23.00 µs  █▃       ▆
                       (14.20 µs … 2.17 ms)  31.90 µs ▅██▂     ▇██
                    (  1.54 kb … 102.68 kb)   1.89 kb █████▇██████▆▃▂▂▂▂▃▂▁

Stack                        272.24 µs/iter 132.80 µs  █  
                       (49.00 µs … 2.02 ms)   1.56 ms ██  
                    (888.00  b … 331.87 kb) 103.48 kb ██▄▁▁▁▁▁▁▂▂▁▁▁▁▁▁▁▂▃▁

StackV2                       35.24 µs/iter  40.70 µs    █ ▄    █
                       (17.60 µs … 1.29 ms)  64.20 µs   ▆█ █  ▂▄█
                    (  1.78 kb … 145.84 kb)   2.31 kb ▆▁█████▅███▆▃▄▂▅▃▂▃▂▁

summary
  RecursionV2
   1.71x faster than StackV2
   11.61x faster than Recursion
   13.17x faster than Stack
```
</details>