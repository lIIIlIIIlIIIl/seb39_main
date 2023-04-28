import { FaDog } from "@react-icons/all-files/fa/FaDog";
import {
  IoBedOutline,
  IoBookOutline,
  IoBrushOutline,
  IoCarSportOutline,
  IoGlassesOutline,
  IoGridOutline,
  IoLaptopOutline,
  IoRestaurantOutline,
  IoShirtOutline,
  IoTennisballOutline,
  IoTicketOutline,
  IoWatchOutline,
} from "react-icons/io5";
import { TbMoodBoy } from "react-icons/tb";

export const categories = [
  { label: "전체", icon: <IoGridOutline /> },
  {
    label: "식품",
    icon: <IoRestaurantOutline />,
  },
  { label: "전자제품", icon: <IoLaptopOutline /> },
  { label: "인테리어", icon: <IoBedOutline /> },
  { label: "의류", icon: <IoShirtOutline /> },
  { label: "잡화", icon: <IoGlassesOutline /> },
  {
    label: "유아동",
    icon: <TbMoodBoy />,
  },
  { label: "디지털기기", icon: <IoWatchOutline /> },
  { label: "차량용품", icon: <IoCarSportOutline /> },
  { label: "도서", icon: <IoBookOutline /> },
  { label: "미용", icon: <IoBrushOutline /> },
  { label: "스포츠", icon: <IoTennisballOutline /> },
  { label: "티켓", icon: <IoTicketOutline /> },
  { label: "반려동물", icon: <FaDog /> },
];
