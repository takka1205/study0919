import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const { name, email } = await request.json();

  try {
    // Prisma Client での処理
    const posts = await prisma.formSubmission.create({ data: { name, email } });
    return NextResponse.json({ message: "成功", posts }, { status: 200 }); // 成功時は 200 ステータスコード
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json({ message: "失敗", err }, { status: 500 });
  } finally {
    await prisma.$disconnect(); // データベース接続のクリーンアップ3
  }
}
