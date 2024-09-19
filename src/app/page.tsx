"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const PostAction = async (name: string, email: string) => {
  const res = await fetch(`http://localhost:3000/api/form/`, {
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ name, email }),
    method: "POST",
  });
  return res.json();
};

export default function Home() {
  const router = useRouter();
  interface State {
    name: string;
    email: string;
  }
  const [Change, setChange] = useState<State>({
    name: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setChange(PrevChange => ({
      ...PrevChange,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await PostAction(Change.name, Change.email);
    router.push("/");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">name</label>
          <input
            className="border"
            type="text"
            name="name"
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="">email</label>
          <input
            className="border"
            type="text"
            name="email"
            onChange={handleChange}
          />
        </div>
        <button className="bg-slate-400 text-black p-2">Submit</button>
      </form>
    </div>
  );
}
