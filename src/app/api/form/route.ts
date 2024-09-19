import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function main() {
  try {
    await prisma.$connect();
  } catch {
    return Error("DB接続に失敗しました");
  }
}

export const POST = async (req: Request) => {
  const { name, email } = await req.json();
  try {
    await main();
    const posts = await prisma.formSubmission.create({ data: { name, email } });
    return NextResponse.json({ message: "成功", posts }, { status: 300 });
  } catch (err) {
    return NextResponse.json({ message: "失敗", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
