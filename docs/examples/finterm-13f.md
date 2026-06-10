# Example: a stock-performance snapshot

With the skill installed, there's nothing special to invoke — you just ask your
agent to build a terminal tool or to print results nicely, and `terminal-report`
kicks in to shape the output. Here's the kind of prompt that triggers it and
produces something close to the screenshot below (your tickers and numbers will
differ).

## The prompt

> Build me a small Python CLI that takes a list of stock tickers and a lookback
> window (like `30d`) and prints an aggregate performance snapshot in the
> terminal. For each ticker show the last price, the return over the window, a
> sparkline of its price trend, RSI, where it sits in its 52-week range, its
> volatility, and max drawdown — sorted by return, with a colored bar next to
> each row showing its return versus the basket. Add an equal-weight basket
> summary and a one-paragraph narration of what happened. Pull daily prices from
> Financial Modeling Prep (my `FMP_API_KEY` is in `.env`). Make the output look
> polished, like a dashboard.

![A stock-performance snapshot rendered with terminal-report](images/finterm-13f.png)

## What the skill contributed

The agent writes the data-fetching and metrics on its own. The **look** — and
the design choices behind it — come from `terminal-report`:

- **Tagged progress log** (`[env] [fmp] [calc] [ai] [done]`) and the `[warn]`
  line that skips a ticker with too little data instead of crashing — graceful
  degradation is baked in.
- **A sorted, aligned table** with right-aligned numbers, a muted/dimmed
  scaffold, and **inline sparklines** per row.
- **Semantic color, not decoration**: green/red returns, an RSI that flags
  overbought/oversold, a green→amber→red volatility scale.
- **Diverging bars** fanning green-right / red-left around a zero axis — the
  signature "is this better or worse than the pack" visual.

## Prompts that also trigger it

You don't have to spell out columns and bars. Any of these reach for the skill:

> My script just dumps numbers — make its output readable with aligned columns
> and color the worst performers red.

> Turn this analysis into a little CLI and print a leaderboard with a bar next to
> each row.

> Show the results like a terminal dashboard.

## Tip

Color only appears in a real terminal — it auto-disables when output is piped or
redirected. Run the tool directly in your terminal (and widen the window so the
table doesn't wrap) before capturing a screenshot.
