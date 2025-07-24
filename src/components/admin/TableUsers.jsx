import React, { useEffect, useState } from "react";
import useBearProvider from "../../providers/Provider";
import {
  changeRole,
  changeStatusActive,
  getAllUsers,
} from "../../services/admin";
import { dateTimeFormat } from "../../utils/DateTimeFormat";

const TableUsers = () => {
  const useStore = useBearProvider((state) => state);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    handleGetAllUsers();
  }, []);

  const handleGetAllUsers = () => {
    getAllUsers(useStore.token)
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  };

  const handleChangeUserStatus = (id, userStatus) => {
    changeStatusActive(useStore.token, {
      id: id,
      enabled: userStatus,
    })
      .then((res) => {
        console.log(res);
        handleGetAllUsers();
      })
      .catch((err) => console.log(err));
  };

  const handleChangeRole = (id, role) => {
    changeRole(useStore.token, {
      id: id,
      role: role,
    })
      .then((res) => {
        console.log(res);
        handleGetAllUsers();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="bg-white mx-auto p-4 shadow-md">
      Users Table
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                #
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Email
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Role
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                CreatedAt
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Status
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Manage Status
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Manage User
              </th>
            </tr>
          </thead>
          <tbody>
            {users?.map((u, key) => {
              return (
                <tr key={key} className="hover:bg-gray-50 border">
                  <td className="px-4 py-3 text-sm text-gray-600">{key + 1}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{u.email}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{u.role}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {dateTimeFormat(u.createdAt)}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {`${u.enabled ? "Active" : "Inactive"}`}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    <select
                      value={u.enabled ? "true" : "false"} // แปลง boolean เป็น string เพื่อให้ match กับ <option value>
                      onChange={
                        (e) =>
                          handleChangeUserStatus(
                            u.id,
                            e.target.value === "true"
                          ) // แปลงกลับเป็น boolean
                      }
                    >
                      <option disabled value="">
                        Select Status
                      </option>
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    <select
                      value={u.role}
                      onChange={(e) => handleChangeRole(u.id, e.target.value)}
                      name=""
                      id=""
                    >
                      <option disabled>Select Role</option>
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableUsers;
