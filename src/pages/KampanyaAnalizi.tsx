
import { useState } from "react";
import { useData, FilterParams } from "@/context/DataContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import KampanyaAnaliziForm from "@/components/kampanya-analizi/KampanyaAnaliziForm";
import OzetVeriPaneli from "@/components/kampanya-analizi/OzetVeriPaneli";
import DetayVeriTablosu from "@/components/kampanya-analizi/DetayVeriTablosu";
import { toast } from "sonner";

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
    <div className="container mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Kampanya Analizi</h1>
        <p className="text-muted-foreground mt-2">
          Mağaza, ürün, tarih ve indirim oranı parametrelerini kullanarak kampanya verilerini analiz edin
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Parametre Seçimleri</CardTitle>
          <CardDescription>
            Analiz için gerekli parametreleri seçin ve "Verileri Getir" butonuna tıklayın
          </CardDescription>
        </CardHeader>
        <CardContent>
          <KampanyaAnaliziForm 
            initialParams={filterParams}
            onSubmit={handleFiltersSubmit} 
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
      
      {dataFetched && (
        <div className="space-y-8">
          <OzetVeriPaneli data={filteredBreakEvenData} />
          
          <Card>
            <CardHeader>
              <CardTitle>Model Sonuçları</CardTitle>
              <CardDescription>
                Seçilen parametrelere göre filtrelenmiş model sonuçları
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DetayVeriTablosu data={filteredModelResultData} />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default KampanyaAnalizi;
