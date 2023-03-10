// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { hashPassword } from "@/utils/auth";
import {
  connectDataBase,
  getDocuments,
  insertDocument,
} from "@/utils/db-utils";
import { nanoid } from "nanoid";

export default async function handler(req, res) {
  let client = null;
  try {
    client = await connectDataBase();
  } catch (err) {
    res.status(500).json({ msg: "unable to connect to db" });
    return;
  }

  if (req.method === "POST") {
    const body = req.body;
    body.userId = nanoid(6);
    const { email } = body;
    try {
      const user = await getDocuments(client, "users", { email });
      if (user.length > 0) {
        return res.status(500).json({ message: "User Already exist" });
      }
      body.password = await hashPassword(body.password);
      body.address = "Rawalpindi, House 09, Street 21, Sector 18";
      await insertDocument(client, "users", { ...body });
      res.status(200).json({ msg: "Sign up success" });
    } catch (err) {
      console.log("err :>> ", err);
      res.status(500).json({ msg: "unable to insert data" });
    }
  }

  client.close();
}
