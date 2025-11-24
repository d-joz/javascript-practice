
# 🚀 `tail` Command: Ultra-Condensed Reference

| **Concept** | **Option/Syntax** | **Effect** | **Note** |
| :--- | :--- | :--- | :--- |
| **NAME** | `tail` | Last part of file. | **Default:** Last 10 lines (`-n 10`). |
| **SYNTAX** | `tail [-Ffr] [-q v] [NUM_OPTS] [file]` | | `NUM_OPTS` = `-n`, `-c`, or `-b`. |

---

### 📏 Unit & Amount Options

| **Option** | **Example** | **Unit/Value** | **Description** |
| :--- | :--- | :--- | :--- |
| **`-n`** | `-n 50` | 50 **Lines** 📄 | Most commonly used for line counts. |
| **`-c`** | `-c 100` | 100 **Bytes** 💾 | Used for exact size limits. |
| **`-b`** | `-b 4` | 4 **Blocks** (512-byte) | Block-based reading. |

---

### 📍 Starting Point

> Use a sign to define where `tail` starts counting:

| **Start Point** | **Syntax** | **Example** | **Meaning** |
| :--- | :--- | :--- | :--- |
| **From Beginning** | Must use **`+`** | `-n +15` | Start at **Line 15** (from the file's top). |
| **From End** | Use **`-`** or **none** | `-c 20` | End with **last 20 bytes** (from the file's bottom). |

---

### 🔄 Monitoring & Control

| **Feature** | **Option** | **Icon** | **Key Function** |
| :--- | :--- | :--- | :--- |
| **Live Follow** | `-f` | 👁️ | Waits for *new* data to be appended. |
| **Robust Follow** | **`-F`** | 🛡️ | **Handles log rotation/renaming.** (Best for logs). |
| **Reverse Output** | `-r` | ↕️ | Displays lines in reverse order. |
| **Suppress Header** | `-q` | 🤫 | Suppress headers (`==> file <==`) for multiple files. |
| **Force Header** | `-v` | 📣 | **Force** headers for single files. |

---

### 💻 Command Examples

```bash
# Display the last 15 lines of a file
$ tail -n 15 filename.log

# Monitor a system log robustly
$ tail -F /var/log/app.log

# Display the whole file in reverse line order
$ tail -r bigfile.txt
