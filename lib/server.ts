import app from "./app";
const port = 4040;

app.listen(port, () => {
  console.log("Express server listening on port " + port);
});

export default app;