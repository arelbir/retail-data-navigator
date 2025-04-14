
import { Link } from "react-router-dom";
import { BarChart, Layers } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Kampanya Analizi & Ara Kategori Uygulaması</h1>
        <p className="text-lg text-muted-foreground">
          Kampanya analizlerini gerçekleştirin ve ara kategorileri yönetin
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card className="border-2 border-primary/20 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <BarChart className="h-6 w-6 text-primary" />
              Kampanya Analizi
            </CardTitle>
            <CardDescription>
              Mağaza, ürün, tarih ve indirim oranına göre kampanya verilerini analiz edin
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">
              Başabaş noktası verilerini ve model sonuçlarını filtreleyip karşılaştırarak kampanya 
              performansını değerlendirebilirsiniz.
            </p>
            <Link to="/kampanya-analizi">
              <Button className="w-full">Kampanya Analizine Git</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-2 border-primary/20 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Layers className="h-6 w-6 text-primary" />
              Ara Kategori
            </CardTitle>
            <CardDescription>
              Ürünlerin ara kategori bilgilerini yönetin
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">
              Ürün kodu, ürün adı ve ara kategori bilgilerini kolayca düzenleyebilir,
              ekleyebilir ve yönetebilirsiniz.
            </p>
            <Link to="/ara-kategori">
              <Button className="w-full">Ara Kategoriye Git</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
