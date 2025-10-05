import express from "express";
import Shop from "../models/Shop.js";
import User from "../models/User.js";

const addShop = async (req, res) => {
  const userId = req.user.id;

  if (!userId) {
    return res
      .status(400)
      .json({ message: "User not authorized to perform this action" });
  }

  const userExists = await User.findOne({ _id: userId });

  if (!userExists) {
    return res.status(400).json({ message: "No user found" });
  }

  try {
    req.body.name = req.body.name.trim();

    if (!req.body.name) {
      return res.status(400).json({ message: "Name is required" });
    }

    req.body.user = userId;

    const shop = await Shop.create(req.body);

    shop.save();

    res.status(200).json({ message: "Shop Added Successfully", data: shop });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error while creating a shop" });
  }
};

const editShop = async (req, res) => {
  const userId = req.user.id;

  if (!userId) {
    return res
      .status(400)
      .json({ message: "User not authorized to perform this action" });
  }

  const userExists = await User.findOne({ _id: userId });

  if (!userExists) {
    return res.status(400).json({ message: "User not found" });
  }

  try {
    const shopId = req.params.id;

    if (!shopId) {
      return res
        .status(400)
        .json({ message: "Id required to perform edit action" });
    }

    const shop = await Shop.findById(shopId);

    if (!shop) {
      return res.status(404).json({ message: "No shop found with this id" });
    }

    const shopUser = shop.user;

    if (userExists.id === shopUser.toString()) {
      const updatedShop = await Shop.findByIdAndUpdate(shopId, req.body, {
        new: true,
      });

      res
        .status(200)
        .json({ message: "Shop Updated Successfully", data: updatedShop });
    } else {
      return res.status(400).json({
        message:
          "User not authorized to perform this action as users does not match",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export { addShop, editShop };
