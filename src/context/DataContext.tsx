
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { formatISO } from 'date-fns';

// Mock data types
export interface BreakEvenData {
  id: number;
  productCode: string;
  productName: string;
  storeCode: string;
  storeName: string;
  totalSales: number;
  averageDiscount: number;
  breakEvenPoint: number;
  profitMargin: number;
}

export interface ModelResultData {
  id: number;
  productCode: string;
  productName: string;
  storeCode: string;
  storeName: string;
  relatedProductGroup: string;
  salesBefore: number;
  salesAfter: number;
  changePercentage: number;
  impactScore: number;
}

export interface IntermediateCategoryData {
  id: number;
  productCode: string;
  productName: string;
  intermediateCategory: string;
}

export interface Store {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
}

// Filter parameters
export interface FilterParams {
  store: string;
  product: string;
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
  timeRange: {
    start: number;
    end: number;
  };
  discountPercentage: number;
}

interface DataContextType {
  // Mock data
  breakEvenData: BreakEvenData[];
  modelResultData: ModelResultData[];
  intermediateCategories: IntermediateCategoryData[];
  stores: Store[];
  products: Product[];
  
  // Filter state
  filterParams: FilterParams;
  setFilterParams: React.Dispatch<React.SetStateAction<FilterParams>>;
  
  // Filtered data
  filteredBreakEvenData: BreakEvenData[];
  filteredModelResultData: ModelResultData[];
  
  // Product group filter for model result
  productGroupFilter: string;
  setProductGroupFilter: React.Dispatch<React.SetStateAction<string>>;
  
  // Intermediate category operations
  addIntermediateCategory: (data: Omit<IntermediateCategoryData, 'id'>) => void;
  updateIntermediateCategory: (id: number, data: Partial<Omit<IntermediateCategoryData, 'id'>>) => void;
  deleteIntermediateCategory: (id: number) => void;
  
  // Fetch data based on filters
  fetchData: () => void;
}

// Create context
const DataContext = createContext<DataContextType | undefined>(undefined);

// Generate mock data
const generateMockBreakEvenData = (): BreakEvenData[] => {
  return Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    productCode: `P${1000 + i}`,
    productName: `Ürün ${i + 1}`,
    storeCode: `S${100 + Math.floor(i / 5)}`,
    storeName: `Mağaza ${Math.floor(i / 5) + 1}`,
    totalSales: Math.round(Math.random() * 10000) / 100,
    averageDiscount: Math.round(Math.random() * 30 * 100) / 100,
    breakEvenPoint: Math.round(Math.random() * 5000) / 100,
    profitMargin: Math.round(Math.random() * 40 * 100) / 100,
  }));
};

const generateMockModelResultData = (): ModelResultData[] => {
  const productGroups = ['Elektronik', 'Giyim', 'Ev Eşyaları', 'Kozmetik', 'Gıda'];
  
  return Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    productCode: `P${1000 + Math.floor(i / 2)}`,
    productName: `Ürün ${Math.floor(i / 2) + 1}`,
    storeCode: `S${100 + Math.floor(i / 6)}`,
    storeName: `Mağaza ${Math.floor(i / 6) + 1}`,
    relatedProductGroup: productGroups[Math.floor(Math.random() * productGroups.length)],
    salesBefore: Math.round(Math.random() * 10000) / 100,
    salesAfter: Math.round(Math.random() * 12000) / 100,
    changePercentage: Math.round((Math.random() * 40 - 10) * 100) / 100,
    impactScore: Math.round(Math.random() * 100) / 10,
  }));
};

const generateMockIntermediateCategories = (): IntermediateCategoryData[] => {
  return Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    productCode: `P${1000 + i}`,
    productName: `Ürün ${i + 1}`,
    intermediateCategory: `Kategori ${Math.floor(Math.random() * 5) + 1}`,
  }));
};

const generateMockStores = (): Store[] => {
  return Array.from({ length: 10 }, (_, i) => ({
    id: `S${100 + i}`,
    name: `Mağaza ${i + 1}`,
  }));
};

const generateMockProducts = (): Product[] => {
  return Array.from({ length: 30 }, (_, i) => ({
    id: `P${1000 + i}`,
    name: `Ürün ${i + 1}`,
  }));
};

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Mock data
  const [breakEvenData] = useState<BreakEvenData[]>(generateMockBreakEvenData());
  const [modelResultData] = useState<ModelResultData[]>(generateMockModelResultData());
  const [intermediateCategories, setIntermediateCategories] = useState<IntermediateCategoryData[]>(
    generateMockIntermediateCategories()
  );
  const [stores] = useState<Store[]>(generateMockStores());
  const [products] = useState<Product[]>(generateMockProducts());

  // Filter state
  const [filterParams, setFilterParams] = useState<FilterParams>({
    store: '',
    product: '',
    dateRange: {
      start: new Date(),
      end: new Date(),
    },
    timeRange: {
      start: 8,
      end: 20,
    },
    discountPercentage: 20,
  });

  // Filtered data state
  const [filteredBreakEvenData, setFilteredBreakEvenData] = useState<BreakEvenData[]>([]);
  const [filteredModelResultData, setFilteredModelResultData] = useState<ModelResultData[]>([]);
  
  // Product group filter
  const [productGroupFilter, setProductGroupFilter] = useState<string>('');

  // Function to fetch data based on filters
  const fetchData = () => {
    // Apply filters to break-even data
    const filteredBreakEven = breakEvenData.filter(item => {
      if (filterParams.store && item.storeCode !== filterParams.store) return false;
      if (filterParams.product && item.productCode !== filterParams.product) return false;
      // Note: In a real application, we would also filter by date, time, and discount
      return true;
    });
    
    setFilteredBreakEvenData(filteredBreakEven);
    
    // Apply filters to model result data
    let filteredModel = modelResultData.filter(item => {
      if (filterParams.store && item.storeCode !== filterParams.store) return false;
      if (filterParams.product && item.productCode !== filterParams.product) return false;
      // Note: In a real application, we would also filter by date, time, and discount
      return true;
    });
    
    // Apply product group filter if selected
    if (productGroupFilter) {
      filteredModel = filteredModel.filter(item => 
        item.relatedProductGroup === productGroupFilter
      );
    }
    
    setFilteredModelResultData(filteredModel);
  };

  // Intermediate category operations
  const addIntermediateCategory = (data: Omit<IntermediateCategoryData, 'id'>) => {
    const newCategory = {
      ...data,
      id: intermediateCategories.length > 0 
        ? Math.max(...intermediateCategories.map(item => item.id)) + 1 
        : 1
    };
    
    setIntermediateCategories(prev => [...prev, newCategory]);
  };

  const updateIntermediateCategory = (id: number, data: Partial<Omit<IntermediateCategoryData, 'id'>>) => {
    setIntermediateCategories(prev => 
      prev.map(item => 
        item.id === id ? { ...item, ...data } : item
      )
    );
  };

  const deleteIntermediateCategory = (id: number) => {
    setIntermediateCategories(prev => 
      prev.filter(item => item.id !== id)
    );
  };

  return (
    <DataContext.Provider
      value={{
        breakEvenData,
        modelResultData,
        intermediateCategories,
        stores,
        products,
        filterParams,
        setFilterParams,
        filteredBreakEvenData,
        filteredModelResultData,
        productGroupFilter,
        setProductGroupFilter,
        addIntermediateCategory,
        updateIntermediateCategory,
        deleteIntermediateCategory,
        fetchData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
