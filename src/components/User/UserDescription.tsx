import React, { useEffect } from "react";
import { Card, Descriptions } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setMenuKey } from "../../redux/posts/postsSlice";

export const UserDescription = () => {
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector((state) => state.userReducer);

  useEffect(() => {
    dispatch(setMenuKey(""));
  }, []);

  return (
    <>
      {!isLoading && (
        <Card>
          <Descriptions title="User Information" layout="vertical">
            <Descriptions.Item label="Name">{user.name}</Descriptions.Item>
            <Descriptions.Item label="Username">
              {user.username}
            </Descriptions.Item>
            <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
            <Descriptions.Item label="Address">
              {user.address.city}, {user.address.street},{user.address.suite},{" "}
              {user.address.zipcode}
            </Descriptions.Item>
            <Descriptions.Item label="Phone">{user.phone}</Descriptions.Item>
            <Descriptions.Item label="Website">
              {user.website}
            </Descriptions.Item>
            <Descriptions.Item label="Company">
              {user.company.name}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      )}
    </>
  );
};
