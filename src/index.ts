const preId = "__root"

function buildPre() {
  const element = document.createElement("pre")
  element.id = preId
  return element
}

const base = buildPre()

document.body.appendChild(base)

base.innerText = "--------\n-----"

type Row = (string | null)[]

class Renderer {
  element: HTMLPreElement
  rows: string[][] = []

  constructor(e: HTMLPreElement) {
    this.element = e
  }

  getLiveRows = () => {
    const stringRows = this.element.innerText.split("\n")
    const rows = stringRows.map((string) => string.split(""))
    this.rows = rows
  }

  findRow = (index: number) => {
    const rows = this.rows

    if (index > rows.length - 1) {
      const rowsToBuild = index - rows.length + 1

      for (let i = 0; i < rowsToBuild; i++) {
        rows.push([])
      }

      this.rows = rows
    }

    const row = rows[index]

    return row
  }

  renderRow = (newRow: Row, index: number, offset?: number) => {
    this.getLiveRows()

    const row = this.findRow(index)

    if (newRow.length > row.length) {
      row.length = newRow.length
    }

    newRow.forEach((char, i) => {
      if (char !== null) {
        row[i + (offset || 0)] = char
      }
    })

    const rowsAsString = this.rows.map((row) => row.join("")).join("\n")
    this.element.innerText = rowsAsString
  }

  renderRows = (renderRowArgsList: Parameters<typeof this.renderRow>[]) => {
    renderRowArgsList.forEach((args) => {
      this.renderRow(...args)
    })
  }
}

const renderer = new Renderer(base)

// renderer.renderRow("aaaaa".split(""), 3)

renderer.renderRows([
  ["aaaaa".split(""), 3],
  ["bbbbbbbbbbbbbbb".split(""), 4],
  [[null, "!"], 4],
  [[null, "!"], 0, 1],
])
