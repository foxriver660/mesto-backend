const auth = (req: any, res: any, next: any) => {
  req.user = {
    _id: "648af0b707a4efa93b0332fa", // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
};
