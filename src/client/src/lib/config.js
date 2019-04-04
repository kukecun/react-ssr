

const HOST = {
  "0": "//testm.yidianling.com",
  "1": "//testm.yidianling.com",
  "2": "//testm.yidianling.com",
  "7": "//testm.yidianling.com",
  "9": "//m.yidianling.com",
}
const HOSTYDL = {
  "0": "//testm.ydl.com",
  "1": "//testm.ydl.com",
  "2": "//testm.ydl.com",
  "7": "//testm.ydl.com",
  "9": "//m.ydl.com",
}

export default {
  jumpurl() {
    return HOST[$G.env]
  },
  jumpydlurl() {
    return HOSTYDL[$G.env]
  },
}
