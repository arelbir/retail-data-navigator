
import { BreakEvenData } from "@/context/DataContext";
import { Card, CardContent } from "@/components/ui/card";
import { 
  AreaChart, 
  BarChart3, 
  DollarSign, 
  Percent 
} from "lucide-react";

interface OzetVeriPaneliProps {
  data: BreakEvenData[];
}

const OzetVeriPaneli = ({ data }: OzetVeriPaneliProps) => {
  // Calculate summary metrics
  const totalSales = data.reduce((sum, item) => sum + item.totalSales, 0);
  const avgDiscount = data.reduce((sum, item) => sum + item.averageDiscount, 0) / (data.length || 1);
  const avgBreakEvenPoint = data.reduce((sum, item) => sum + item.breakEvenPoint, 0) / (data.length || 1);
  const avgProfitMargin = data.reduce((sum, item) => sum + item.profitMargin, 0) / (data.length || 1);
  
  const summaryCards = [
    {
      title: "Toplam Satış",
      value: `${totalSales.toLocaleString("tr-TR")} ₺`,
      icon: DollarSign,
      color: "bg-blue-500",
    },
    {
      title: "Ortalama İndirim",
      value: `%${avgDiscount.toFixed(2)}`,
      icon: Percent,
      color: "bg-green-500",
    },
    {
      title: "Başabaş Noktası (Ort.)",
      value: `${avgBreakEvenPoint.toLocaleString("tr-TR")} ₺`,
      icon: BarChart3,
      color: "bg-orange-500",
    },
    {
      title: "Kar Marjı (Ort.)",
      value: `%${avgProfitMargin.toFixed(2)}`,
      icon: AreaChart,
      color: "bg-purple-500",
    },
  ];
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Başabaş Noktası Özeti</h2>
        <p className="text-muted-foreground">
          Seçilen parametrelere göre hesaplanan özet veriler
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Card key={index} className="border-2 border-muted">
              <CardContent className="p-6 flex items-center gap-4">
                <div className={`p-3 rounded-full ${card.color} text-white`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{card.title}</p>
                  <h3 className="text-2xl font-bold">{card.value}</h3>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      {data.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Ürün Kodu
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Ürün Adı
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Mağaza
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Toplam Satış
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Ort. İndirim
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Başabaş N.
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Kar Marjı
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-muted/50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.productCode}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                    {item.productName}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                    {item.storeName}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 text-right">
                    {item.totalSales.toLocaleString("tr-TR")} ₺
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 text-right">
                    %{item.averageDiscount.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 text-right">
                    {item.breakEvenPoint.toLocaleString("tr-TR")} ₺
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 text-right">
                    %{item.profitMargin.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OzetVeriPaneli;
