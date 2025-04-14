
import { Link } from "react-router-dom";
import { BarChart, Layers, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="py-8">
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <div className="inline-block mb-4 p-2 bg-primary/10 rounded-xl">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        </div>
        <h1 className="text-3xl font-semibold mb-3">Kampanya Analizi & Ara Kategori Uygulaması</h1>
        <p className="text-sm text-muted-foreground">
          Kampanya analizlerini gerçekleştirin ve ara kategorileri yönetin
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Card className="border border-border/40 shadow-sm hover:shadow-md transition-all hover:border-primary/20 overflow-hidden">
          <CardHeader className="pb-0 pt-6">
            <div className="mb-2 inline-block p-2 bg-primary/10 rounded-lg">
              <BarChart className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-xl">Kampanya Analizi</CardTitle>
            <CardDescription className="text-xs mt-1">
              Mağaza, ürün, tarih ve indirim oranına göre kampanya verilerini analiz edin
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <p className="mb-6 text-sm text-muted-foreground">
              Başabaş noktası verilerini ve model sonuçlarını filtreleyip karşılaştırarak kampanya 
              performansını değerlendirebilirsiniz.
            </p>
            <Link to="/kampanya-analizi">
              <Button className="w-full bg-primary hover:bg-primary/90 gap-1">
                Kampanya Analizine Git
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border border-border/40 shadow-sm hover:shadow-md transition-all hover:border-primary/20 overflow-hidden">
          <CardHeader className="pb-0 pt-6">
            <div className="mb-2 inline-block p-2 bg-primary/10 rounded-lg">
              <Layers className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-xl">Ara Kategori</CardTitle>
            <CardDescription className="text-xs mt-1">
              Ürünlerin ara kategori bilgilerini yönetin
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <p className="mb-6 text-sm text-muted-foreground">
              Ürün kodu, ürün adı ve ara kategori bilgilerini kolayca düzenleyebilir,
              ekleyebilir ve yönetebilirsiniz.
            </p>
            <Link to="/ara-kategori">
              <Button className="w-full bg-primary hover:bg-primary/90 gap-1">
                Ara Kategoriye Git
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
