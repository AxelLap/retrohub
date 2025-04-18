import { useUserStore } from "@/lib/store/use-user-store";
import { getOrderId } from "@/lib/tools/getOrderId";
import Link from "next/link";

export const OrderTicket = ({ itemCount }) => {
  const userName = useUserStore((s) => s.user);
  console.log(userName);
  const orderId = getOrderId(userName, itemCount);

  return (
    <div className="w-2/4 rounded-md flex flex-col gap-3 bg-gray-600 justify-center items-center m-auto mt-[40px] mb-[40px]">
      <p>Your order Id is : </p>
      <span className=" font-bold">{orderId}</span>
      <Link className="underline text-center text-black" href="/">
        You can follow the shipment here
      </Link>
    </div>
  );
};
