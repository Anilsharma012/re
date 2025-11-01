import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Alert, AlertDescription } from "../components/ui/alert";
import {
  MapPin,
  Calendar,
  Users,
  Car,
  Search,
  Filter,
  Eye,
  Trash2,
  CheckCircle,
  Clock,
  User,
  Phone,
  Mail,
} from "lucide-react";

interface Enquiry {
  _id: string;
  name: string;
  mobile: string;
  email?: string;
  pickupLocation: string;
  destination: string;
  travelDate: string;
  passengers: string;
  vehicleType: string;
  message?: string;
  status: "new" | "quoted" | "confirmed" | "completed" | "cancelled";
  createdAt: Date;
}

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch("/api/admin/enquiries", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setEnquiries(data.enquiries || []);
      } else {
        setMessage({ type: "error", text: "Failed to fetch enquiries" });
      }
    } catch (error) {
      console.error("Failed to fetch enquiries:", error);
      setMessage({ type: "error", text: "Failed to fetch enquiries" });
    } finally {
      setLoading(false);
    }
  };

  const updateEnquiryStatus = async (enquiryId: string, status: string) => {
    const token = localStorage.getItem("adminToken");
    try {
      const response = await fetch(`/api/admin/enquiries/${enquiryId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        setMessage({ type: "success", text: "Status updated successfully" });
        fetchEnquiries();
      } else {
        setMessage({ type: "error", text: "Failed to update status" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to update status" });
    }
  };

  const deleteEnquiry = async (enquiryId: string) => {
    if (!confirm("Are you sure you want to delete this enquiry?")) return;

    const token = localStorage.getItem("adminToken");
    try {
      const response = await fetch(`/api/admin/enquiries/${enquiryId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setMessage({ type: "success", text: "Enquiry deleted successfully" });
        fetchEnquiries();
      } else {
        setMessage({ type: "error", text: "Failed to delete enquiry" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to delete enquiry" });
    }
  };

  const filteredEnquiries = enquiries.filter((enquiry) => {
    const matchesSearch =
      enquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.mobile.includes(searchTerm) ||
      enquiry.pickupLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.vehicleType.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || enquiry.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-700";
      case "quoted":
        return "bg-yellow-100 text-yellow-700";
      case "confirmed":
        return "bg-green-100 text-green-700";
      case "completed":
        return "bg-purple-100 text-purple-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "new":
        return <Clock className="w-3 h-3" />;
      case "quoted":
        return <Car className="w-3 h-3" />;
      case "confirmed":
        return <CheckCircle className="w-3 h-3" />;
      case "completed":
        return <CheckCircle className="w-3 h-3" />;
      case "cancelled":
        return <Clock className="w-3 h-3" />;
      default:
        return <Clock className="w-3 h-3" />;
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading enquiries...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tour Enquiries</h1>
          <p className="text-gray-600">
            Manage tour bookings and travel enquiries
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-sm">
            Total: {enquiries.length}
          </Badge>
          <Badge className="text-sm bg-blue-100 text-blue-700">
            New: {enquiries.filter((e) => e.status === "new").length}
          </Badge>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by name, location, destination, or vehicle type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="quoted">Quoted</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

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

      {/* Enquiries List */}
      <div className="space-y-4">
        {filteredEnquiries.map((enquiry) => (
          <Card key={enquiry._id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{enquiry.name}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {enquiry.mobile}
                      </span>
                      {enquiry.email && (
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {enquiry.email}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(enquiry.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    className={`${getStatusColor(enquiry.status)} flex items-center gap-1`}
                  >
                    {getStatusIcon(enquiry.status)}
                    {enquiry.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="bg-blue-50 rounded-lg p-3">
                  <div className="flex items-center gap-1 text-blue-600 text-xs font-medium mb-1">
                    <MapPin className="w-3 h-3" />
                    From
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {enquiry.pickupLocation}
                  </p>
                </div>

                <div className="bg-green-50 rounded-lg p-3">
                  <div className="flex items-center gap-1 text-green-600 text-xs font-medium mb-1">
                    <MapPin className="w-3 h-3" />
                    To
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {enquiry.destination}
                  </p>
                </div>

                <div className="bg-purple-50 rounded-lg p-3">
                  <div className="flex items-center gap-1 text-purple-600 text-xs font-medium mb-1">
                    <Calendar className="w-3 h-3" />
                    Travel Date
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {enquiry.travelDate}
                  </p>
                </div>

                <div className="bg-orange-50 rounded-lg p-3">
                  <div className="flex items-center gap-1 text-orange-600 text-xs font-medium mb-1">
                    <Users className="w-3 h-3" />
                    Passengers
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {enquiry.passengers}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <Car className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">
                  Vehicle Type:
                </span>
                <Badge variant="outline">{enquiry.vehicleType}</Badge>
              </div>

              {enquiry.message && (
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    <span className="font-medium">Message: </span>
                    {enquiry.message}
                  </p>
                </div>
              )}

              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Select
                    value={enquiry.status}
                    onValueChange={(value) =>
                      updateEnquiryStatus(enquiry._id, value)
                    }
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="quoted">Quoted</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedEnquiry(enquiry)}
                    className="flex items-center gap-1"
                  >
                    <Eye className="w-3 h-3" />
                    View Details
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deleteEnquiry(enquiry._id)}
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

      {filteredEnquiries.length === 0 && !loading && (
        <Card className="text-center py-12">
          <CardContent>
            <Car className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {searchTerm || statusFilter !== "all"
                ? "No matching enquiries found"
                : "No enquiries yet"}
            </h3>
            <p className="text-gray-600">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search or filter criteria."
                : "Tour enquiries will appear here when customers submit booking requests."}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
