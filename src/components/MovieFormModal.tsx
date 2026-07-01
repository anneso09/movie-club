import { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { movieSchema } from "@/schemas/movie";

type Movie = {
  slug: string;
  title: string;
  description_short?: string;
  description_long?: string;
  rating?: number | null;
  type?: string;
  img?: string;
  isTrending?: boolean;
  comingSoon?: boolean;
};

type MovieFormModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (movie: Movie) => void;
  initialData?: Movie;
};

const emptyForm: Movie = {
  slug: "",
  title: "",
  description_short: "",
  description_long: "",
  rating: null,
  type: "",
  img: "",
  isTrending: false,
  comingSoon: false,
};

export default function MovieFormModal({
  open,
  onClose,
  onSubmit,
  initialData,
}: MovieFormModalProps) {
  const [form, setForm] = useState<Movie>(initialData ?? emptyForm);
  const [errors, setErrors] = useState<{ slug?: string; title?: string }>({});

  useEffect(() => {
    setForm(initialData ?? emptyForm);
    setErrors({});
  }, [initialData, open]);

  function handleChange(field: keyof Movie, value: any) {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Efface l'erreur du champ dès que l'utilisateur tape
    if (field === "slug" || field === "title") {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  function handleSubmit() {
    // Validation des champs obligatoires
    const newErrors: { slug?: string; title?: string } = {};
    if (!form.slug || form.slug.trim() === "") newErrors.slug = "Slug is required";
    if (!form.title || form.title.trim() === "") newErrors.title = "Title is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Bloque le submit
    }

    const movieToSubmit = {
      ...form,
      rating: form.comingSoon ? null : Number(form.rating),
    };
    onSubmit(movieToSubmit);
    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{initialData ? "Edit Movie" : "Add Movie"}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Slug *"
            value={form.slug}
            onChange={(e) => handleChange("slug", e.target.value)}
            disabled={!!initialData}
            fullWidth
            error={!!errors.slug}
            helperText={errors.slug}
          />
          <TextField
            label="Title *"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            fullWidth
            error={!!errors.title}
            helperText={errors.title}
          />
          <TextField
            label="Short Description"
            value={form.description_short}
            onChange={(e) => handleChange("description_short", e.target.value)}
            fullWidth
            multiline
            rows={2}
          />
          <TextField
            label="Long Description"
            value={form.description_long}
            onChange={(e) => handleChange("description_long", e.target.value)}
            fullWidth
            multiline
            rows={4}
          />
          <TextField
            label="Genre"
            value={form.type}
            onChange={(e) => handleChange("type", e.target.value)}
            fullWidth
          />
          <TextField
            label="Poster URL"
            value={form.img}
            onChange={(e) => handleChange("img", e.target.value)}
            fullWidth
          />
          <TextField
            label="Rating"
            type="number"
            value={form.rating ?? ""}
            onChange={(e) => handleChange("rating", e.target.value)}
            disabled={form.comingSoon}
            fullWidth
          />
          <FormControlLabel
            control={
              <Switch
                checked={form.isTrending}
                onChange={(e) => handleChange("isTrending", e.target.checked)}
              />
            }
            label="Trending"
          />
          <FormControlLabel
            control={
              <Switch
                checked={form.comingSoon}
                onChange={(e) => handleChange("comingSoon", e.target.checked)}
              />
            }
            label="Coming Soon"
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {initialData ? "Save Changes" : "Add Movie"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}