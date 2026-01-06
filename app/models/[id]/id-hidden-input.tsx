"use client"

import { Input } from "@/components/ui/input";
import { useParams } from "next/navigation"

export default function IdHiddenInput() {
    const params = useParams();
    return <Input type="hidden" name="id" value={params.id == 'new' ? 0 : params.id} className="hidden" />;
}