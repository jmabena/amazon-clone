import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import {
  collection,
  query,
  onSnapshot,
  doc,
  orderBy,
  where,
} from "firebase/firestore";
import "./Orders.css";
import { useStateValue } from "./StateProvider";
import Order from "./Order";
import { v4 as uuidv4 } from "uuid";

function Orders() {
  const [{ user, basket }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      const c = collection(db, "users", user?.uid, "orders");
      //const q = query(c, orderBy("created", "desc"));
      const orderSnap = onSnapshot(c, (snapshot) =>
        setOrders(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
      //   const coll = onSnapshot(
      //     collection(
      //       db,
      //       "users",
      //       user?.uid,
      //       "orders",
      //       orderBy("created", "desc")
      //     ),
      //   (snapshot) =>
      //     setOrders(
      //       snapshot.docs.map((doc) => ({
      //         id: doc.id,
      //         data: doc.data(),
      //       }))
      //     )
      //   );
    } else {
      setOrders([]);
    }
    // db.collection("users")
    //   .doc(user?.uid)
    //   .collection("orders")
    //   .orderBy("created", "desc")
    //   .onSnapshot((snapshot) =>
    //     setOrders(
    //       snapshot.docs.map((doc) => ({
    //         id: doc.id,
    //         data: doc.data(),
    //       }))
    //     )
    //   );
  }, [user]);
  return (
    <div className="orders">
      <h1>Your Orders</h1>
      <div className="orders_order">
        {orders?.map(
          (order) =>  (<Order key={uuidv4()} order={order} />)
        )}
      </div>
    </div>
  );
}

export default Orders;
