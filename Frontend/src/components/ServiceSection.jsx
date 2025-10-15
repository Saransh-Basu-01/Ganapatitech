
import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { servicesAPI } from "../services/serviceAPI";
import { getServiceIcon } from "../utils/iconMapping";

const ServiceSection = () => {
  // State management
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch services when component mounts
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch active services from Django backend
      const data = await servicesAPI.getActive();
      setServices(data);
      
    } catch (err) {
      setError(err.message || 'Failed to fetch services');
      console.error('Error fetching services:', err);
    } finally {
      setLoading(false);
    }
  };

  // Loading State
  if (loading) {
    return (
      <section className="py-20 bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
          <p className="text-white text-lg">Loading services...</p>
        </div>
      </section>
    );
  }

  // Error State
  if (error) {
    return (
      <section className="py-20 bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="bg-red-900/20 border border-red-500 rounded-xl p-8 max-w-md text-center">
          <p className="text-red-400 mb-4">❌ {error}</p>
          <button
            onClick={fetchServices}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  // Empty State
  if (!services || services.length === 0) {
    return (
      <section className="py-20 bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="text-center text-gray-400">
          <p className="text-xl">No services available at the moment.</p>
        </div>
      </section>
    );
  }

  // Main Content - Your original design
  return (
    <section className="py-20 bg-gray-900 min-h-screen">
      <div className="container mx-auto px-6 text-center text-white">
        <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-red-500 to-blue-900 bg-clip-text text-transparent">
          Our Services
        </h2>
        <p className="text-lg mb-12 max-w-2xl mx-auto">
          Technology solutions to accelerate your digital transformation.
        </p>

        <div className="grid lg:grid-cols-2 gap-8">
          {services.map((service) => {
            const { icon: Icon, gradient } = getServiceIcon(service.name);
            
            return (
              <div
                key={service.id}
                className="relative group rounded-2xl transition-transform duration-500 hover:scale-105"
              >
                {/* Neon background on hover */}
                <div
                  className="absolute inset-0 -z-10 rounded-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 
                      bg-gradient-to-br from-red-500 via-yellow-400 to-blue-500 blur-3xl animate-pulse"
                ></div>

                <div
                  className="relative z-10 bg-gray-800 rounded-2xl p-8 shadow-lg transition-shadow duration-500 group-hover:shadow-neon"
                >
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 mb-4 mx-auto rounded-2xl flex items-center justify-center bg-gradient-to-br ${gradient} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Featured Badge */}
                  {service.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                        ⭐ Featured
                      </span>
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="text-2xl font-bold mb-4">{service.name}</h3>

                  {/* Description */}
                  {service.description && (
                    <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  )}

                  {/* Features */}
                  {service.features && service.features.length > 0 && (
                    <ul className="text-gray-200 mb-6 space-y-2 text-left">
                      {service.features.map((feature) => (
                        <li key={feature.id} className="flex items-center">
                          <span className="w-2 h-2 bg-white rounded-full mr-3 mt-1"></span>
                          {feature.feature}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
