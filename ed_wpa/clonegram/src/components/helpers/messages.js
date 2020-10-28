export const errorMsg = (msg, err) => {
  console.log(err)

  return `
    <div class="message-error">
      <p>Error: <b>${msg}</b></p>
    </div>
  `
}

export const successMsg = (msg) => {
  return `
    <div class="message-sucess">
      <p>Exito: <b>${msg}</b></p>
    </div>
  `
}
