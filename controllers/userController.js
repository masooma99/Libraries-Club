const testing = async (req, res) => {
  try {
    res.send("testing is successfully done")
  } catch (error) {
    res.send("Error while testing")
    console.log(error)
  }
}

module.exports = {
  testing,
}
