# STAR — ML-Driven Algorithmic Trading Platform (Ougha.Trading)

> **Company:** Personal Project
> **Period:** 2024 – Present
> **Role:** Sole Architect & Developer
> **Evidence:** 45 commits (`Ougha.Trading`) + 157 commits (`Ougha.MultiStrategyTradingBot`) + 31 commits (`GoldTraderEA`) + 2 commits (`fiveMinScalperEA`) = **235 total commits** across trading projects

---

## Situation

Algorithmic trading in financial markets traditionally relies on hardcoded technical indicator strategies (moving averages, RSI, Bollinger Bands) that fail to adapt to changing market conditions. My prior trading bots (`fiveMinScalperEA` in Python, `GoldTraderEA` in MQL5, `MultiStrategyTradingBot` with 157 commits) demonstrated this limitation — profitable strategies would degrade over time as market regimes shifted. The Python-based system also suffered from performance bottlenecks in backtesting and couldn't fully leverage GPU hardware acceleration. I needed a system that could **learn and adapt** rather than follow static rules.

## Task

I set out to:

- Build **GPU-accelerated reinforcement learning agents** for multi-symbol, multi-timeframe trading
- Implement both value-based (DQN) and policy-gradient (PPO) RL architectures
- Engineer GPU-optimized training infrastructure (lazy loading, async prefetching, double-buffering)
- Export trained models to **ONNX** for production deployment to MetaTrader
- Migrate the entire system from Python to a high-performance **.NET 10 architecture**
- Build a comprehensive feature engineering pipeline for market state representation
- Create a low-latency data pipeline for real-time and historical market data

## Action

### Deep Reinforcement Learning Agents

#### PPO (Actor-Critic) Agent — .NET 10
- Implemented **PPO (Proximal Policy Optimization)** with Actor-Critic model architecture *(commits: `da01538`, `720258d`, `69c0fbd`)*
- Built **async rollout buffer** for efficient experience collection *(commit: `13d280d`)*
- Created **stateful sequence processing** for time-series context awareness *(commit: `7b93391`)*
- Designed **ActionLogAnalyzer** for training insights and diagnostics *(commit: `9ffe141`)*
- Improved PPO efficiency and stability *(commits: `a1be747`, `5f38d07`)*
- Adjusted agent and reward configuration for better training dynamics *(commit: `6011ff9`)*

#### DualHeadDQN Agent — Python
- Built **DualHeadDQN agent** for optimized double-buffered RL training *(commit: `f72d2d6`)*
- Multi-symbol, multi-timeframe RL training with new environment and display components *(commit: `ede6e5d`)*
- Added comprehensive action and trade statistics tracking *(commits: `b8dc6f6`, `acf87d5`, `9588a95`)*

### GPU-Optimized Training Pipeline

#### LazyReplayBuffer & Memory Optimization
- Built **`LazyReplayBuffer`** replacing `FastReplayBuffer` to reduce memory footprint *(commit: `35dd44d`)*
- Added **GPUReplayBuffer** with batch vectorized addition *(commit: `bbbc694`)*
- Implemented **reusable tensor manager** and caching *(commit: `f3fd954`)*
- Removed float16 support from LazyReplayBuffer after finding precision issues *(commit: `f52cfa5`)*
- Added **Numba acceleration** and vectorized features to FastReplayBuffer *(commit: `d91c9d0`)*
- Pre-allocated buffers to **reduce GC pressure** *(commit: `402abca`)*

#### Async Prefetching & Double-Buffering
- Implemented **async prefetching** for training pipeline overlap *(commit: `bcb2694`)*
- Built **fused batching and double-buffering** for lock-free reads *(commits: `6e151e7`, `d249c17`)*
- Added float16 support and threaded training optimizations *(commit: `31fd1bf`)*
- Optimized with **mixed precision** and float16 support *(commit: `532398e`)*
- Enhanced with **Tensor Core support** and shared memory *(commit: `5cc47dd`)*

#### Training Performance Metrics
- Added loop iteration tracking and average time metrics *(commit: `78facb9`)*
- Enhanced training metrics and improved model scalability *(commit: `f6e9c5d`)*
- Built rich console display for real-time training visualization *(commits: `907e5e7`, `875a4b8`, `85bc34d`)*
- Added detailed trade logging and action/trade statistics *(commits: `4652bbc`, `9588a95`)*

### Portfolio Trading Environment
- Engineered custom **`PortfolioTradingEnvironment`** as the RL learning environment *(commits: `544aa5a`, `d9a9c1c`, `6f6c85d`)*
- Built **chunk-based data provisioning** and environment pooling *(commit: `43f0367`)*
- Chunked streaming for **memory-efficient RL training** *(commit: `82872d1`)*
- Vectorized RL trading environment implementation *(commit: `90ed845`)*
- Simplified environment step logic, removed parallel processing overhead *(commit: `e310228`)*

### MultiTimeframeStateBuilder
- Developed **`MultiTimeframeStateBuilder`** processing raw OHLCV candle data into **47 distinct normalized market features** *(commit: `544aa5a`)*
- Multi-timeframe aggregations (M1 to D1) for comprehensive market state representation
- Feature normalization and rolling statistics for stable training inputs

### Custom Reward System
- Designed reward functions evaluating **equity curves, drawdown penalties, and holding penalties** *(commit: `a9b99a1`)*
- Implemented **volatility normalization** with balanced scaling for reward stability *(commit: `95b1ac5`)*
- Enhanced reward criteria and optimized data handling *(commit: `c32dc12`)*
- Configurable reward parameters for rapid experimentation *(commit: `6011ff9`)*

### Data Pipeline & Storage
- Built low-latency pipeline with **QuestDB** for sub-millisecond time-series retrieval
- Implemented **DuckDB streaming mode** with memory-efficient cursors *(commit: `cdbdb10`)*
- Fast tick data loading with **lazy-loading** for memory efficiency *(commit: `f023242`)*
- Consolidated repository usage and optimized QuestDB operations *(commit: `4e96476`)*
- Added **economic calendar service** with Forex Factory scraping via Python cloudscraper *(commit: `6c01e17`)*

### Training Infrastructure
- Built **TrainingRunner** with progress tracking and console display *(commits: `907e5e7`, `875a4b8`)*
- Implemented **TrainingBudgetCalculator** with GPU memory-aware batch sizing *(commit: `8f1e378`)*
- Added **early stopping** with chunk-based episode calculations to prevent overfitting *(commits: `4652bbc`, `cd6c7ad`)*
- Integrated **Optuna** hyperparameter optimization *(commits: `2859510`, `adbf33d`)*
- Added adaptive scheduling and enhanced replay buffer caching *(commit: `224d51a`)*
- Extracted **DeviceManager** for streamlined GPU/CPU setup *(commit: `5cf7ca7`)*

### ONNX Export & Production Deployment
- Added **ONNX readiness check** and optimized ML workflows for ONNX *(commit: `46145e3`)*
- Enables deployment of trained agents to **MetaTrader** for live trading
- Integrated **PythonNet** bridge for MetaTrader 5 API (order execution, tick data)

### Prior Trading System Evolution (Context)
- **MultiStrategyTradingBot** (157 commits): Multi-strategy Python trading system with:
  - Multi-symbol RL training scripts *(commit: `b8a14b3`)*
  - GPU optimization guide and adaptive architecture *(commit: `554241a`)*
  - Aggressive GPU utilization with hyperparameter tuning *(commit: `6ae4edb`)*
  - Validation decorators for automatic strategy validation *(commit: `876adc0`)*
  - True Breakout, Fakeout, HFT momentum strategies
- **GoldTraderEA** (31 commits): MQL5 Expert Advisor for gold trading on MetaTrader
- **fiveMinScalperEA** (2 commits): Initial Python scalping bot — the starting point

## Result

- **235 total commits** across the full trading project evolution (Python → MQL5 → .NET/RL)
- **Two RL architectures**: DualHeadDQN (value-based) and PPO Actor-Critic (policy-gradient)
- GPU-optimized training pipeline: **LazyReplayBuffer → async prefetch → fused batching → double-buffered training** reduced iteration time significantly
- **47-feature state representation** captures comprehensive market context across multiple timeframes
- Custom reward function balances **profit maximization with risk management** (drawdown penalties, holding costs)
- **ONNX model export** enables deployment to live MetaTrader trading
- Backtesting engine achieves **sub-millisecond** data retrieval from QuestDB
- **Optuna** hyperparameter optimization for systematic performance improvement
- **DuckDB streaming mode** enables training on datasets larger than available RAM
- Successfully migrated from Python to **.NET 10** with **GPU-accelerated inference** via TorchSharp/CUDA

---

## Interview Questions This Covers

| Question | How to Answer |
|----------|--------------|
| "Tell me about a machine learning project" | PPO + DualHeadDQN for portfolio trading, 47-feature pipeline, ONNX export |
| "How do you optimize for performance?" | LazyReplayBuffer, async prefetch, fused batching, double-buffering, Tensor Cores |
| "Do you have ML/AI experience?" | Two RL architectures, custom reward system, Optuna HPO, ONNX deployment |
| "How do you handle performance-critical systems?" | TorchSharp + CUDA, QuestDB sub-ms, GC pressure reduction, buffer pre-allocation |
| "Describe migrating a system" | Python → .NET, 157-commit predecessor → 45-commit RL system |
| "How do you iterate on a technical problem?" | 4 projects showing evolution: scripts → EAs → bots → RL agents |
| "How do you handle long-running computations?" | Async prefetching, double-buffering, early stopping, chunk-based episodes |

---

## Key Technologies

`.NET 10` · `C#` · `TorchSharp` · `PyTorch` · `CUDA` · `QuestDB` · `DuckDB` · `PythonNet` · `MetaTrader 5` · `Reinforcement Learning` · `PPO` · `DQN` · `Actor-Critic` · `ONNX` · `Optuna` · `Numba` · `Feature Engineering` · `Time-Series` · `Python` · `MQL5`
