import { useState, useEffect } from "react";
import axios from "axios";
import { getUserFromCookies } from "@/components/auth/oldtoken";
const cookieUser = getUserFromCookies();

interface UserData {
  name: string;
  email: string;
  phone: string;
  address: string;
  userType: string;
  cv: string | null | undefined;
  cvUrl: string | undefined | null;
  profileImageUrl: null | string;
}

const useUserData = () => {
  const [user, setUser] = useState<UserData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    userType: "",
    cv: "null",
    cvUrl: "",
    profileImageUrl: "",
  });

  const [fieldValues, setFieldValues] = useState<Partial<UserData>>({});
  const fetchData = async () => {
    try {
      const cookieuser = getUserFromCookies();
      const token = cookieUser?.token;
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/?id=${cookieuser?.id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      const userData = response.data;
      setUser({
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        address: userData.address || "",
        userType: userData.userType || "",
        profileImageUrl: userData.profileImageUrl || null,
        cv: userData.cv || null,
        cvUrl: userData.cvUrl || null,
      });

      setFieldValues({
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        address: userData.address || "",
        userType: userData.userType || "",
        cv: userData.cv || null,
        cvUrl: userData.cvUrl || null,
        profileImageUrl: userData.profileImageUrl || null,
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return { user, setUser, fieldValues, setFieldValues, fetchData };
};

export default useUserData;
