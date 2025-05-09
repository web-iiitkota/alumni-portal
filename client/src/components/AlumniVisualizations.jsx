import { useState, useEffect } from 'react';
import { Modal, Box, Typography, IconButton, Tabs, Tab } from '@mui/material';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import CloseIcon from '@mui/icons-material/Close';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AlumniVisualizations = ({ isOpen, onClose, alumniData }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [chartData, setChartData] = useState({
    graduationYear: {},
    branch: {},
    city: {},
    company: {},
    role: {},
  });

  useEffect(() => {
    if (alumniData && alumniData.length > 0) {
      // Process data for charts
      const processedData = {
        graduationYear: {},
        branch: {},
        city: {},
        company: {},
        role: {},
      };

      alumniData.forEach((alumni) => {
        // Count graduation years
        processedData.graduationYear[alumni.graduationYear] = 
          (processedData.graduationYear[alumni.graduationYear] || 0) + 1;
        
        // Count branches
        processedData.branch[alumni.branch] = 
          (processedData.branch[alumni.branch] || 0) + 1;
        
        // Count cities
        processedData.city[alumni.city] = 
          (processedData.city[alumni.city] || 0) + 1;
        
        // Count companies
        processedData.company[alumni.currentCompany] = 
          (processedData.company[alumni.currentCompany] || 0) + 1;
        
        // Count roles
        processedData.role[alumni.role] = 
          (processedData.role[alumni.role] || 0) + 1;
      });

      setChartData(processedData);
    }
  }, [alumniData]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const createChartData = (data, label, backgroundColor) => {
    const labels = Object.keys(data).sort();
    const values = labels.map(key => data[key]);

    return {
      labels,
      datasets: [
        {
          label,
          data: values,
          backgroundColor,
          borderColor: backgroundColor,
          borderWidth: 1,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  const renderChart = () => {
    switch (activeTab) {
      case 0: // Graduation Year
        return (
          <div className="h-[400px]">
            <Bar
              data={createChartData(
                chartData.graduationYear,
                'Alumni by Graduation Year',
                'rgba(25, 25, 77, 0.8)'
              )}
              options={chartOptions}
            />
          </div>
        );
      case 1: // Branch
        return (
          <div className="h-[400px]">
            <Pie
              data={createChartData(
                chartData.branch,
                'Alumni by Branch',
                [
                  'rgba(25, 25, 77, 0.8)',
                  'rgba(0, 150, 136, 0.8)',
                  'rgba(156, 39, 176, 0.8)',
                  'rgba(76, 175, 80, 0.8)',
                  'rgba(255, 152, 0, 0.8)',
                ]
              )}
              options={chartOptions}
            />
          </div>
        );
      case 2: // City
        return (
          <div className="h-[400px]">
            <Bar
              data={createChartData(
                chartData.city,
                'Alumni by City',
                'rgba(0, 150, 136, 0.8)'
              )}
              options={chartOptions}
            />
          </div>
        );
      case 3: // Company
        return (
          <div className="h-[400px]">
            <Bar
              data={createChartData(
                chartData.company,
                'Alumni by Company',
                'rgba(156, 39, 176, 0.8)'
              )}
              options={chartOptions}
            />
          </div>
        );
      case 4: // Role
        return (
          <div className="h-[400px]">
            <Pie
              data={createChartData(
                chartData.role,
                'Alumni by Role',
                [
                  'rgba(76, 175, 80, 0.8)',
                  'rgba(255, 152, 0, 0.8)',
                  'rgba(233, 30, 99, 0.8)',
                  'rgba(33, 150, 243, 0.8)',
                  'rgba(156, 39, 176, 0.8)',
                ]
              )}
              options={chartOptions}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="visualization-modal-title"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '95%', sm: '80%', md: '70%' },
          maxHeight: '90vh',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          overflowY: 'auto',
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: '#4A5568',
            '&:hover': {
              color: '#1A202C',
              backgroundColor: 'transparent',
            },
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography
          id="visualization-modal-title"
          variant="h5"
          component="h2"
          sx={{ mb: 3, color: '#1A202C', fontWeight: 'bold' }}
        >
          Alumni Data Visualizations
        </Typography>

        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ mb: 3 }}
        >
          <Tab label="Graduation Year" />
          <Tab label="Branch" />
          <Tab label="City" />
          <Tab label="Company" />
          <Tab label="Role" />
        </Tabs>

        {renderChart()}
      </Box>
    </Modal>
  );
};

export default AlumniVisualizations; 