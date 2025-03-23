export const testFun = (req, res) => {
  res.status(200).send({
    message: "test Routes",
    success: true,
  });
};
