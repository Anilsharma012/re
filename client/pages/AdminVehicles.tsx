import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import { Alert, AlertDescription } from "../components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Switch } from "../components/ui/switch";
import {
  Car,
  Plus,
  Edit,
  Trash2,
  Users,
  IndianRupee,
  Calendar,
  CheckCircle,
  XCircle,
  Eye,
  Activity,
} from "lucide-react";

interface Vehicle {
  _id?: string;
  name: string;
  type: string;
  capacity: number;
  price: number;
  features: string[];
  image?: string;
  description?: string;
  available: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export default function AdminVehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [formData, setFormData] = useState<Partial<Vehicle>>({
    name: "",
    type: "",
    capacity: 0,
    price: 0,
    features: [],
    description: "",
    available: true,
    image: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async (retryCount = 0) => {
    console.log(
      `🚗 Fetching vehicles for admin panel... (attempt ${retryCount + 1})`,
    );

    try {
      // Check if server is reachable first
      let response;
      try {
        response = await Promise.race([
          fetch("/api/vehicles", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Cache-Control": "no-cache",
            },
          }),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Request timeout')), 10000)
          )
        ]);
      } catch (fetchError) {
        // If fetch fails completely, try a simpler endpoint first
        console.log('🔧 Primary fetch failed, testing server connectivity...');
        try {
          const pingResponse = await fetch("/api/simple-ping");
          if (pingResponse.ok) {
            console.log('✅ Server is reachable, retrying vehicles fetch...');
            response = await fetch("/api/vehicles", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            });
          } else {
            throw new Error('Server not responding');
          }
        } catch (pingError) {
          throw new Error('Cannot connect to server');
        }
      }

      console.log("📡 Response status:", response.status);

      if (!response.ok) {
        throw new Error(
          `Server returned ${response.status}: ${response.statusText}`,
        );
      }

      const data = await response.json();
      console.log("✅ Vehicles fetch response:", data);

      if (data.success) {
        setVehicles(data.vehicles || []);
        setMessage({
          type: "success",
          text: `✅ Successfully loaded ${data.vehicles?.length || 0} vehicles from database`,
        });

        // Clear success message after 3 seconds
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      } else {
        console.warn("⚠️ Vehicles fetch unsuccessful:", data.message);
        setVehicles([]);
        setMessage({
          type: "error",
          text: data.message || "Failed to fetch vehicles",
        });
      }
    } catch (error) {
      console.error("❌ Failed to fetch vehicles:", error);

      // Provide user-friendly error message
      let errorMessage = "Failed to load vehicles";
      if (error.message.includes("Failed to fetch")) {
        errorMessage =
          "🔌 Cannot connect to server. Please check your internet connection and try again.";
      } else if (
        error.message.includes("Server returned") ||
        error.message.includes("Server error")
      ) {
        errorMessage = `��� ${error.message}`;
      } else if (error.name === "TypeError") {
        errorMessage = "🔌 Network connection issue. Please try again.";
      } else if (error.message) {
        errorMessage = `⚠️ ${error.message}`;
      }

      setMessage({ type: "error", text: errorMessage });

      // Retry once after 2 seconds if it's the first attempt
      if (retryCount === 0) {
        console.log("🔄 Will retry fetching vehicles in 2 seconds...");
        setTimeout(() => {
          fetchVehicles(1);
        }, 2000);
        setVehicles([]); // Set empty array for now
      } else {
        // After retry failed, show offline mode with sample vehicles
        console.log("📱 Entering offline mode with sample vehicles...");
        const offlineVehicles = [
          {
            _id: 'offline_1',
            name: "Sample Vehicle 1",
            type: "Sedan",
            capacity: 4,
            price: 2500,
            features: ["AC", "GPS", "Music System"],
            description: "Sample vehicle (offline mode)",
            available: true,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            _id: 'offline_2',
            name: "Sample Vehicle 2",
            type: "SUV",
            capacity: 7,
            price: 4000,
            features: ["AC", "Captain Seats", "GPS"],
            description: "Sample vehicle (offline mode)",
            available: true,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ];
        setVehicles(offlineVehicles);
        setMessage({
          type: "error",
          text: "📱 Offline mode: Showing sample vehicles. Server connection failed."
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");

    try {
      let finalFormData = { ...formData };

      // Upload image if there's a new one
      if (imageFile && imagePreview) {
        try {
          const uploadedImageUrl = await uploadImage(imagePreview);
          finalFormData.image = uploadedImageUrl;
        } catch (error) {
          console.error(
            "Image upload failed, proceeding without image:",
            error,
          );
        }
      }

      const url = editingVehicle
        ? `/api/admin/vehicles/${editingVehicle._id}`
        : "/api/admin/vehicles";

      const method = editingVehicle ? "PUT" : "POST";

      console.log("💾 Submitting vehicle data...");

      // Create a robust fetch request that bypasses tracking script interference
      let response;
      try {
        // Try using XMLHttpRequest as fallback to bypass FullStory interference
        response = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open(method, url);
          xhr.setRequestHeader("Content-Type", "application/json");
          xhr.setRequestHeader("Authorization", `Bearer ${token}`);
          xhr.setRequestHeader("Cache-Control", "no-cache");

          xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
              resolve({
                ok: true,
                status: xhr.status,
                statusText: xhr.statusText,
                json: () => Promise.resolve(JSON.parse(xhr.responseText))
              });
            } else {
              reject(new Error(`HTTP ${xhr.status}: ${xhr.statusText}`));
            }
          };

          xhr.onerror = () => reject(new Error('Network error'));
          xhr.ontimeout = () => reject(new Error('Request timeout'));
          xhr.timeout = 30000; // 30 second timeout

          xhr.send(JSON.stringify({
            ...finalFormData,
            features: finalFormData.features || [],
          }));
        });
      } catch (xhrError) {
        // If XMLHttpRequest fails, try native fetch with additional headers
        console.log('🔄 XMLHttpRequest failed, trying native fetch...');
        response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "Cache-Control": "no-cache",
            "X-Requested-With": "XMLHttpRequest", // Help bypass tracking scripts
          },
          body: JSON.stringify({
            ...finalFormData,
            features: finalFormData.features || [],
          }),
        });
      }

      console.log("📡 Submit response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Server error ${response.status}: ${errorText || response.statusText}`,
        );
      }

      const data = await response.json();

      if (data.success) {
        setMessage({ type: "success", text: data.message });
        setDialogOpen(false);
        setEditingVehicle(null);
        setFormData({
          name: "",
          type: "",
          capacity: 0,
          price: 0,
          features: [],
          description: "",
          available: true,
          image: "",
        });
        setImageFile(null);
        setImagePreview("");
        fetchVehicles();
      } else {
        setMessage({ type: "error", text: data.message });
      }
    } catch (error) {
      console.error("❌ Failed to save vehicle:", error);

      let errorMessage = "Failed to save vehicle";
      if (error.message.includes("Failed to fetch") || error.message.includes("Network error")) {
        errorMessage = "🔌 Connection issue detected. This might be caused by browser extensions or tracking scripts. Vehicle may have been saved anyway - please check the vehicle list.";
      } else if (error.message.includes("Request timeout")) {
        errorMessage = "⏱️ Request timeout. The server might be busy. Please try again.";
      } else if (error.message.includes("HTTP")) {
        errorMessage = `🚫 Server error: ${error.message}`;
      } else if (error.name === "TypeError") {
        errorMessage = "🔧 Browser compatibility issue. Try refreshing the page or using a different browser.";
      } else if (error.message) {
        errorMessage = `⚠️ ${error.message}`;
      }

      setMessage({ type: "error", text: errorMessage });

      // After showing error, refresh the vehicle list to check if it was actually saved
      setTimeout(() => {
        console.log("🔄 Checking if vehicle was saved despite the error...");
        fetchVehicles();
      }, 2000);
    }
  };

  const handleEdit = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setFormData({
      name: vehicle.name,
      type: vehicle.type,
      capacity: vehicle.capacity,
      price: vehicle.price,
      features: vehicle.features,
      description: vehicle.description,
      available: vehicle.available,
      image: vehicle.image,
    });
    setImagePreview(vehicle.image || "");
    setImageFile(null);
    setDialogOpen(true);
  };

  const handleDelete = async (vehicleId: string) => {
    if (!confirm("Are you sure you want to delete this vehicle?")) return;

    const token = localStorage.getItem("adminToken");

    try {
      console.log("🗑️ Deleting vehicle:", vehicleId);

      const response = await fetch(`/api/admin/vehicles/${vehicleId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("📡 Delete response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Server error ${response.status}: ${errorText || response.statusText}`,
        );
      }

      const data = await response.json();

      if (data.success) {
        setMessage({ type: "success", text: "Vehicle deleted successfully" });
        fetchVehicles();
      } else {
        setMessage({
          type: "error",
          text: data.message || "Failed to delete vehicle",
        });
      }
    } catch (error) {
      console.error("❌ Failed to delete vehicle:", error);

      let errorMessage = "Failed to delete vehicle";
      if (error.name === "AbortError") {
        errorMessage = "Request timeout - server is taking too long to respond";
      } else if (error.message.includes("Failed to fetch")) {
        errorMessage =
          "Cannot connect to server - please check your internet connection";
      } else if (error.message.includes("HTTP error")) {
        errorMessage = `Server error: ${error.message}`;
      }

      setMessage({ type: "error", text: errorMessage });
    }
  };

  const seedVehicles = async () => {
    if (
      !confirm(
        "This will replace all existing vehicles with sample data. Continue?",
      )
    )
      return;

    const token = localStorage.getItem("adminToken");

    try {
      const response = await fetch("/api/admin/seed-vehicles", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: "success", text: data.message });
        fetchVehicles();
      } else {
        setMessage({ type: "error", text: data.message });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to seed vehicles" });
    }
  };

  const retryLastSubmission = async () => {
    if (!formData.name) {
      setMessage({ type: 'error', text: 'No form data to retry. Please fill the form again.' });
      return;
    }

    console.log('🔄 Retrying last vehicle submission...');
    setMessage({ type: 'success', text: '🔄 Retrying submission...' });

    // Use a simple fetch without XMLHttpRequest fallback for retry
    try {
      const token = localStorage.getItem("adminToken");
      const url = editingVehicle
        ? `/api/admin/vehicles/${editingVehicle._id}`
        : "/api/admin/vehicles";
      const method = editingVehicle ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          features: formData.features || [],
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage({ type: "success", text: "✅ Retry successful! Vehicle saved." });
        setDialogOpen(false);
        setEditingVehicle(null);
        setFormData({
          name: "",
          type: "",
          capacity: 0,
          price: 0,
          features: [],
          description: "",
          available: true,
          image: "",
        });
        fetchVehicles();
      } else {
        setMessage({ type: "error", text: `Retry failed: ${response.status}` });
      }
    } catch (error) {
      setMessage({ type: "error", text: `Retry failed: ${error.message}` });
    }
  };

  const forceRefresh = async () => {
    console.log('💪 Force refreshing vehicles data...');
    setLoading(true);
    setMessage({ type: 'success', text: '🔄 Force refreshing data...' });
    setVehicles([]); // Clear existing vehicles

    // Reset any cached state and fetch fresh data
    try {
      await fetchVehicles(0);
    } catch (error) {
      console.error('Force refresh failed:', error);
      setMessage({ type: 'error', text: 'Force refresh failed. Please check your connection.' });
    } finally {
      setLoading(false);
    }
  };

  const testConnection = async () => {
    try {
      console.log("🔧 Testing API connection...");
      setMessage({ type: "success", text: "⏳ Testing connection..." });

      const response = await fetch("/api/simple-ping", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMessage({
          type: "success",
          text: "✅ Server connection successful! API is responding normally.",
        });
        console.log("��� Connection test passed:", data);
      } else {
        setMessage({
          type: "error",
          text: `⚠️ Server responded with status ${response.status} - ${response.statusText}`,
        });
      }
    } catch (error) {
      console.error("❌ Connection test failed:", error);
      setMessage({
        type: "error",
        text: "❌ Cannot connect to server. Please check your internet connection and try again.",
      });
    }
  };

  const testStorage = async () => {
    try {
      const response = await fetch("/api/debug/storage");
      const data = await response.json();

      if (data.success) {
        const storageInfo = `Storage: ${data.storage.type}
Vehicles: ${data.storage.collections.vehicles}
Enquiries: ${data.storage.collections.enquiries}
Contacts: ${data.storage.collections.contacts}

Sample vehicles: ${data.storage.sampleVehicles.map((v) => v.name).join(", ")}`;

        alert(storageInfo);
      } else {
        setMessage({ type: "error", text: "Failed to check storage" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to check storage status" });
    }
  };

  const handleFeaturesChange = (value: string) => {
    const features = value
      .split(",")
      .map((f) => f.trim())
      .filter((f) => f);
    setFormData({ ...formData, features });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setImagePreview(imageUrl);
        setFormData({ ...formData, image: imageUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (imageData: string): Promise<string> => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch("/api/admin/upload-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ imageData }),
      });

      const data = await response.json();
      if (data.success) {
        return data.imageUrl;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Image upload failed:", error);
      return imageData; // Fallback to original data
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading vehicles...</p>
          <p className="text-sm text-gray-500 mt-2">
            If this takes too long, there might be a connection issue
          </p>
          <Button
            onClick={() => {
              setLoading(false);
              setMessage({ type: 'error', text: 'Loading cancelled. Try using Force Refresh.' });
            }}
            variant="outline"
            className="mt-4"
          >
            Cancel Loading
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Vehicle Management
          </h1>
          <p className="text-gray-600">Manage your fleet of vehicles</p>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={forceRefresh}
            variant="default"
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white"
          >
            <Activity className="w-4 h-4" />
            💪 Force Refresh
          </Button>
          <Button
            onClick={testConnection}
            variant="outline"
            className="flex items-center gap-2 border-green-600 text-green-600 hover:bg-green-50"
          >
            <Activity className="w-4 h-4" />
            🔧 Test Connection
          </Button>
          <Button
            onClick={fetchVehicles}
            variant="outline"
            className="flex items-center gap-2 border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            <Activity className="w-4 h-4" />
            🔄 Retry Load
          </Button>
          <Button
            onClick={testStorage}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Eye className="w-4 h-4" />
            Check Storage
          </Button>

          <Button
            onClick={seedVehicles}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Seed Sample Data
          </Button>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setEditingVehicle(null);
                  setFormData({
                    name: "",
                    type: "",
                    capacity: 0,
                    price: 0,
                    features: [],
                    description: "",
                    available: true,
                    image: "",
                  });
                  setImageFile(null);
                  setImagePreview("");
                }}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Vehicle
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingVehicle ? "Edit Vehicle" : "Add New Vehicle"}
                </DialogTitle>
                <DialogDescription>
                  {editingVehicle
                    ? "Update vehicle information"
                    : "Add a new vehicle to your fleet"}
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Vehicle Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="e.g., Mahindra Scorpio"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="type">Vehicle Type</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) =>
                        setFormData({ ...formData, type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SUV">SUV</SelectItem>
                        <SelectItem value="Sedan">Sedan</SelectItem>
                        <SelectItem value="Hatchback">Hatchback</SelectItem>
                        <SelectItem value="Tempo Traveller">
                          Tempo Traveller
                        </SelectItem>
                        <SelectItem value="Bus">Bus</SelectItem>
                        <SelectItem value="Luxury">Luxury</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="capacity">Seating Capacity</Label>
                    <Input
                      id="capacity"
                      type="number"
                      value={formData.capacity}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          capacity: parseInt(e.target.value),
                        })
                      }
                      placeholder="e.g., 7"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="price">Price (per day)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          price: parseInt(e.target.value),
                        })
                      }
                      placeholder="e.g., 2500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="features">Features (comma-separated)</Label>
                  <Input
                    id="features"
                    value={formData.features?.join(", ")}
                    onChange={(e) => handleFeaturesChange(e.target.value)}
                    placeholder="AC, GPS, Music System, WiFi"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Vehicle description..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="image">Vehicle Image</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="cursor-pointer"
                  />
                  {imagePreview && (
                    <div className="mt-2">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-32 h-24 object-cover rounded-lg border"
                      />
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="available"
                    checked={formData.available}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, available: checked })
                    }
                  />
                  <Label htmlFor="available">Available for booking</Label>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingVehicle ? "Update Vehicle" : "Add Vehicle"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Messages */}
      {message && (
        <Alert
          className={`mb-6 ${message.type === "error" ? "border-red-200 bg-red-50" : "border-green-200 bg-green-50"}`}
        >
          <AlertDescription
            className={
              message.type === "error" ? "text-red-700" : "text-green-700"
            }
          >
            {message.text}
          </AlertDescription>
        </Alert>
      )}

      {/* Vehicles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((vehicle) => (
          <Card key={vehicle._id} className="relative">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Car className="w-5 h-5" />
                    {vehicle.name}
                  </CardTitle>
                  <CardDescription>{vehicle.type}</CardDescription>
                </div>
                <Badge variant={vehicle.available ? "default" : "secondary"}>
                  {vehicle.available ? (
                    <CheckCircle className="w-3 h-3 mr-1" />
                  ) : (
                    <XCircle className="w-3 h-3 mr-1" />
                  )}
                  {vehicle.available ? "Available" : "Unavailable"}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-1 text-gray-600">
                  <Users className="w-4 h-4" />
                  {vehicle.capacity} seats
                </span>
                <span className="flex items-center gap-1 font-semibold text-green-600">
                  <IndianRupee className="w-4 h-4" />
                  {vehicle.price}/day
                </span>
              </div>

              {vehicle.features && vehicle.features.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {vehicle.features.slice(0, 3).map((feature, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                  {vehicle.features.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{vehicle.features.length - 3} more
                    </Badge>
                  )}
                </div>
              )}

              {vehicle.description && (
                <p className="text-sm text-gray-600 line-clamp-2">
                  {vehicle.description}
                </p>
              )}

              <div className="flex justify-between items-center pt-2">
                <span className="text-xs text-gray-500">
                  <Calendar className="w-3 h-3 inline mr-1" />
                  {vehicle.createdAt
                    ? new Date(vehicle.createdAt).toLocaleDateString()
                    : "N/A"}
                </span>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(vehicle)}
                    className="flex items-center gap-1"
                  >
                    <Edit className="w-3 h-3" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(vehicle._id!)}
                    className="flex items-center gap-1 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-3 h-3" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {vehicles.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Car className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No vehicles found
            </h3>
            <p className="text-gray-600 mb-4">
              Get started by adding your first vehicle to the fleet.
            </p>
            <Button
              onClick={() => setDialogOpen(true)}
              className="flex items-center gap-2 mx-auto"
            >
              <Plus className="w-4 h-4" />
              Add Your First Vehicle
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
