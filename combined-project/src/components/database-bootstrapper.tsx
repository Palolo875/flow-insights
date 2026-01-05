"use client";

import { useEffect } from "react";
import { db } from "@/lib/database";

export function DatabaseBootstrapper() {
  useEffect(() => {
    // Initialize the database
    db.open()
      .then(() => {
        console.log("Database opened successfully");
      })
      .catch((error) => {
        console.error("Failed to open database:", error);
      });

    // Clean up function
    return () => {
      db.close();
    };
  }, []);

  return null;
}