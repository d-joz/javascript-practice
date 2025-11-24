# ✂️ `tail` Ultra-Condensed Cheatsheet

| Section | Option/Syntax | Unit/Effect | Notes |
| --- | --- | --- | --- |
| **NAME** | `tail` | Last part of file. | Default: Last 10 lines (`-n 10`). |
| **SYNTAX** | `tail [-Ffr] [-q v] [NUM_OPTS] [file]` | | `NUM_OPTS` = `-n`, `-c`, or `-b`. |
 ---  ---  ---  --- 
| **AMOUNT** | `-n 50` | 50 **Lines** | The most common option. |
| **UNITS** | `-c 100` | 100 **Bytes** | Use this for exact size. |
| **UNITS** | `-b 4` | 4 **Blocks** (512-byte) | Use for block-based reading. |
| --- | --- | --- | --- |
| **START** | `-n +15` | Start at **Line 15** | `+` means counting from the **beginning**. |
| **END** | `-c -20` (or `-c 20`) | End with **last 20 bytes** | `-` or no sign means counting from the **end**. |
| --- | --- | --- | --- |
| **FOLLOW** | `-f` | **Follow** EOF | Waits for *new* data. |
| **FOLLOW** | **`-F`** | **Follow Robustly** | **Handles log rotation/renaming.** (Best for logs). |
| **ORDER** | `-r` | **Reverse** display | Displays lines in reverse order. |
| **OUTPUT** | `-q` | **Quiet** | Suppress headers (`==> file <==`) for multiple files. |
| **OUTPUT** | `-v` | **Verbose** | **Force** headers for single files. |
| --- |

## 💡 Examples

```bash
# Display the last 15 lines of a file
$ tail -n 15 filename.log

# Monitor a log file, even if it gets renamed (rotated)
$ tail -F /var/log/app.log

# Display the entire file in reverse order
$ tail -r bigfile.txt
```

