"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Chat } from "@/lib/types";
import { format } from "date-fns";
import {Clock, ExternalLink, FileArchive, FileText, FileX } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

function DocHistory({chats}:{chats:Chat[] | null}) {
  const [documents, setDocuments] = useState<Chat[]>(chats || []);


  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-4 text-foreground">
        Document Chat History
      </h2>

      {documents.length ? (
        <div className="flex flex-col space-y-4">
          {documents.map((doc, index) => (
            <Card key={index} className="border-border bg-muted/40 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center gap-3">
                  <FileText className="text-muted-foreground w-5 h-5" />
                  <CardTitle className="text-base font-medium">
                    {doc.pdfname}
                  </CardTitle>
                </div>
                <Badge variant="secondary">PDF</Badge>
              </CardHeader>

              <CardContent className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground space-y-1">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{format(doc.createdat, "MMM d, yyyy")}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FileArchive className="w-4 h-4" />
                    <span>{doc.pdfsize}</span>
                  </div>
                </div>

                  <Link href={`/chat/${doc.id}`} prefetch={false} >
                <Button size="sm" variant="outline">
                  <ExternalLink className="mr-2 w-4 h-4" />
                  View
                </Button>
                  </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-6 rounded-lg  border-border  text-center">
          <FileX className="w-12 h-12 text-muted-foreground mb-6" />
          <p className="text-sm text-muted-foreground">
            No documents uploaded yet.
          </p>
          
        </div>
      )}
    </div>
  );
}

export default DocHistory;
