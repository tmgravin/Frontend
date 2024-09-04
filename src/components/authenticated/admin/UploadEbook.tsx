"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Loader2,
  Download,
  AlertCircle,
  Plus,
  Edit,
  Trash,
  Upload,
} from "lucide-react";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";

interface Ebook {
  id?: string; // Made optional if it aligns with your requirements
  title?: any;
  coverUrl?: string;
  downloadUrl?: string;
  ebookFile?: File | string | null;
  coverFile?: File | string | null;
}

export default function Component() {
  const [ebooks, setEbooks] = useState<Ebook[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [newEbook, setNewEbook] = useState({
    title: "",
    coverFile: null as File | null,
    ebookFile: null as File | null,
  });
  const [editingEbook, setEditingEbook] = useState<Ebook | null>(null);
  const [deletingEbook, setDeletingEbook] = useState<Ebook | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchEbooks();
  }, []);

  const fetchEbooks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/ebooks/`
      );
      if (!response.ok) throw new Error("Failed to fetch ebooks");
      const data = await response.json();

      const mappedEbooks = data.map((ebook: any) => ({
        id: ebook.id.toString(),
        title: ebook.bookTitle,
        coverUrl: ebook.coverImageUrl,
        downloadUrl: ebook.bookUrl,
      }));

      setEbooks(mappedEbooks);
    } catch (err) {
      setError("Error fetching ebooks. Please try again later.");
      console.error("Error fetching ebooks:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddEbook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEbook.coverFile || !newEbook.ebookFile) {
      setError("Please select both a cover image and an ebook file.");
      return;
    }

    const formData = new FormData();
    formData.append("bookTitle", newEbook.title);
    formData.append("coverImageUrl", newEbook.coverFile);
    formData.append("bookUrl", newEbook.ebookFile);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/ebooks/`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Failed to add ebook");
      toast.success("Ebook added successfully");

      setIsAddModalOpen(false);
      setNewEbook({ title: "", coverFile: null, ebookFile: null });
      fetchEbooks();
    } catch (err) {
      toast.error("Error adding ebook:");
      console.error("Error adding ebook:", err);
      setError("Error adding ebook. Please try again.");
    }
  };

  const handleEditEbook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEbook) return;

    const formData = new FormData();
    formData.append("bookTitle", editingEbook.title);
    if (editingEbook.coverFile) {
      formData.append("coverImageUrl", editingEbook.coverFile);
    }
    if (editingEbook.ebookFile) {
      formData.append("bookUrl", editingEbook.ebookFile);
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/ebooks/?id=${editingEbook.id}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Failed to edit ebook");
      toast.success("Ebook updated successfully");
      setIsEditModalOpen(false);
      setEditingEbook(null);
      fetchEbooks();
    } catch (err) {
      toast.error("Error updating ebook:");

      console.error("Error editing ebook:", err);
      setError("Error editing ebook. Please try again.");
    }
  };

  const handleDeleteEbook = async () => {
    if (!deletingEbook) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/ebooks/${deletingEbook.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Failed to delete ebook");
      toast.success("Ebook deleted successfully");

      setIsDeleteModalOpen(false);
      setDeletingEbook(null);
      fetchEbooks();
    } catch (err) {
      toast.error("Error deleting ebook:");
      console.error("Error deleting ebook:", err);
      setError("Error deleting ebook. Please try again.");
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "cover" | "ebook"
  ) => {
    const file = e.target.files?.[0] || null;
    if (type === "cover") {
      setNewEbook((prev) => ({ ...prev, coverFile: file }));
    } else {
      setNewEbook((prev) => ({ ...prev, ebookFile: file }));
    }
  };

  const handleEditFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "cover" | "ebook"
  ) => {
    const file = e.target.files?.[0] || null;
    if (editingEbook) {
      if (type === "cover") {
        setEditingEbook((prev) => ({ ...prev, coverFile: file }));
      } else {
        setEditingEbook((prev) => ({ ...prev, ebookFile: file }));
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Ebook Library</h1>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Ebook
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Ebook</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddEbook} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newEbook.title}
                  onChange={(e) =>
                    setNewEbook({ ...newEbook, title: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="coverFile">Cover Image</Label>
                <Input
                  id="coverFile"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "cover")}
                  required
                />
              </div>
              <div>
                <Label htmlFor="ebookFile">Ebook File</Label>
                <Input
                  id="ebookFile"
                  type="file"
                  accept=".pdf,.epub,.mobi"
                  onChange={(e) => handleFileChange(e, "ebook")}
                  required
                />
              </div>
              <Button type="submit">Add Ebook</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cover</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ebooks.map((ebook) => (
            <TableRow key={ebook.id}>
              <TableCell>
                <Image
                  height="16"
                  width="24"
                  src={`${ebook.coverUrl}`}
                  alt={`Cover for ${ebook.title}`}
                  className="w-16 h-24 object-cover rounded-md"
                />
              </TableCell>
              <TableCell>{ebook.title}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => window.open(ebook.downloadUrl, "_blank")}
                  >
                    <Download className="mr-2 h-4 w-4" /> Download
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEditingEbook(ebook);
                      setIsEditModalOpen(true);
                    }}
                  >
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setDeletingEbook(ebook);
                      setIsDeleteModalOpen(true);
                    }}
                  >
                    <Trash className="mr-2 h-4 w-4" /> Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Ebook</DialogTitle>
          </DialogHeader>
          {editingEbook && (
            <form onSubmit={handleEditEbook} className="space-y-4">
              <div>
                <Label htmlFor="editTitle">Title</Label>
                <Input
                  id="editTitle"
                  value={editingEbook.title}
                  onChange={(e) =>
                    setEditingEbook({ ...editingEbook, title: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="editCoverFile">Cover Image</Label>
                <Input
                  id="editCoverFile"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleEditFileChange(e, "cover")}
                />
              </div>
              <div>
                <Label htmlFor="editEbookFile">Ebook File</Label>
                <Input
                  id="editEbookFile"
                  type="file"
                  accept=".pdf,.epub,.mobi"
                  onChange={(e) => handleEditFileChange(e, "ebook")}
                />
              </div>
              <Button type="submit">Update Ebook</Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Are you sure you want to delete the ebook &quot;
            {deletingEbook?.title}&quot;? This action cannot be undone.
          </DialogDescription>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteEbook}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
