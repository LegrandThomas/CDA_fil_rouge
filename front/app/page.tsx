"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

interface User {
  user_uuid: string;
  username: string;
  email: string;
  password: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  role: Role;
}

interface Role {
  role_uuid: string;
  role_name: string;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("/api/users");
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data: User[] = await res.json();
        setUsers(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    async function fetchRoles() {
      try {
        const res = await fetch("/api/roles");
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Role[] = await res.json();
        setRoles(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
    fetchRoles();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">app/page.tsx</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:text-left">
        <div className="mb-6">
          <h2 className="mb-3 text-2xl font-semibold">Users List</h2>
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">UUID</th>
                <th className="border border-gray-300 p-2">Username</th>
                <th className="border border-gray-300 p-2">Email</th>
                <th className="border border-gray-300 p-2">Role</th>
                <th className="border border-gray-300 p-2">Active</th>
                <th className="border border-gray-300 p-2">Date de création</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.user_uuid}>
                  <td className="border border-gray-300 p-2">{user.user_uuid}</td>
                  <td className="border border-gray-300 p-2">{user.username}</td>
                  <td className="border border-gray-300 p-2">{user.email}</td>
                  <td className="border border-gray-300 p-2">
                    {user.role ? user.role.role_name : "No Role"}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {user.is_active ? "Yes" : "No"}
                  </td>
                  <td className="border border-gray-300 p-2">
                  {new Date(user.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <h2 className="mb-3 mt-6 text-2xl font-semibold">Roles List</h2>
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">UUID</th>
                <th className="border border-gray-300 p-2">Role Name</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role) => (
                <tr key={role.role_uuid}>
                  <td className="border border-gray-300 p-2">{role.role_uuid}</td>
                  <td className="border border-gray-300 p-2">{role.role_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
