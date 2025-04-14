
import { useState } from "react";
import { useData, FilterParams } from "@/context/DataContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import KampanyaAnaliziForm from "@/components/kampanya-analizi/KampanyaAnaliziForm";
import OzetVeriPaneli from "@/components/kampanya-analizi/OzetVeriPaneli";
import DetayVeriTablosu from "@/components/kampanya-analizi/DetayVeriTablosu";
import { toast } from "sonner";
import { BarChart, ListFilter, ChevronRight } from "lucide-react";

const KampanyaAnalizi = () => {
  const { 
    filterParams, 
    setFilterParams, 
    fetchData,
    filteredBreakEvenData,
    filteredModelResultData
  } = useData();
  
  const [isLoading, setIsLoading] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);
  
  const handleFiltersSubmit = async (params: FilterParams) => {
    setIsLoading(true);
    setFilterParams(params);
    
    // Simulate API call with timeout
    setTimeout(() => {
      fetchData();
      setIsLoading(false);
      setDataFetched(true);
      toast.success("Veriler başarıyla getirildi");
    }, 1000);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold">Kampanya Analizi</h1>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
            <span className="text-muted-foreground">Parametre Seçimi</span>
          </div>
          <p className="text-muted-foreground mt-1 text-sm">
            Mağaza, ürün, tarih ve indirim oranı parametrelerini kullanarak kampanya verilerini analiz edin
          </p>
        </div>
      </div>
      
      <Card className="border border-border/40 shadow-sm overflow-hidden">
        <CardHeader className="bg-secondary/30 border-b border-border/30 pb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-md bg-primary/10">
              <ListFilter className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Parametre Seçimleri</CardTitle>
              <CardDescription className="text-xs mt-1">
                Analiz için gerekli parametreleri seçin ve "Verileri Getir" butonuna tıklayın
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <KampanyaAnaliziForm 
            initialParams={filterParams}
            onSubmit={handleFiltersSubmit} 
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
      
      {dataFetched && (
        <div className="space-y-6">
          <OzetVeriPaneli data={filteredBreakEvenData} />
          
          <Card className="border border-border/40 shadow-sm">
            <CardHeader className="bg-secondary/30 border-b border-border/30 pb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-md bg-primary/10">
                  <BarChart className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Model Sonuçları</CardTitle>
                  <CardDescription className="text-xs mt-1">
                    Seçilen parametrelere göre filtrelenmiş model sonuçları
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <DetayVeriTablosu data={filteredModelResultData} />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default KampanyaAnalizi;
