const preId = "__root"

function buildPre() {
  const element = document.createElement("pre")
  element.id = preId
  return element
}

const base = buildPre()

document.body.appendChild(base)

base.innerText = "--------\n-----"

function Renderer(e: HTMLPreElement) {
  this.element = e
  this.rows = []

  this.getLiveRows = () => {
    let rows = this.element.innerText.split("\n")
    rows = rows.map((string) => string.split(""))
    this.rows = rows
  }

  this.findRow = (index: number) => {
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

  this.renderRow = (newRow: (string | null)[], index: number) => {
    this.getLiveRows()

    const row = this.findRow(index)

    if (newRow.length > row.length) {
      row.length = newRow.length
    }

    newRow.forEach((char, i) => {
      if (char !== null) {
        row[i] = char
      }
    })

    const rowsAsString = this.rows.map((row) => row.join("")).join("\n")
    this.element.innerText = rowsAsString
  }
}

const renderer = new Renderer(base)

renderer.renderRow("aaaaa".split(""), 3)
renderer.renderRow("bbbbbbbbbbbbbbb".split(""), 4)
renderer.renderRow([null, "!"], 4)
