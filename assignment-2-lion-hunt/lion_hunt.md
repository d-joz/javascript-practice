## Test Cases to Try

| Input            | Expected Output |
| ---------------- | --------------- |
| `"LZ"`           | 0               |
| `"Z L"`          | 1               |
| `"Z LZ"`         | 1               |
| `"L     Z"`      | 5               |
| `"L     L"`      | -1              |
| `"Z   Z   Z"`    | -1              |
| `"L  ZL Z"`      | 0               |
| `"L  Z   L Z"`   | 1               |
| `"L  Z LZ  L Z"` | 0               |
| `"ZZZZZZ   LLL"` | 3               |
