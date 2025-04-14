
import { useState } from "react";
import { ModelResultData, useData } from "@/context/DataContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Bar, BarChart, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface DetayVeriTablosuProps {
  data: ModelResultData[];
}

const DetayVeriTablosu = ({ data }: DetayVeriTablosuProps) => {
  const { productGroupFilter, setProductGroupFilter } = useData();
  
  // Get unique product groups
  const productGroups = Array.from(
    new Set(data.map((item) => item.relatedProductGroup))
  );
  
  // Prepare chart data
  const chartData = data.slice(0, 10).map((item) => ({
    name: item.productName,
    value: item.changePercentage,
    color: item.changePercentage >= 0 ? "#4ade80" : "#f43f5e",
  }));
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="w-full md:w-1/3">
          <div className="space-y-2">
            <Label htmlFor="productGroup">İlgili Ürün Grubu Filtresi</Label>
            <Select
              value={productGroupFilter}
              onValueChange={setProductGroupFilter}
            >
              <SelectTrigger id="productGroup">
                <SelectValue placeholder="Ürün grubu seçin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tüm Gruplar</SelectItem>
                {productGroups.map((group) => (
                  <SelectItem key={group} value={group}>
                    {group}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Card className="w-full md:w-2/3 h-60">
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" tickFormatter={(value) => value.substring(0, 10) + (value.length > 10 ? "..." : "")} />
                <YAxis tickFormatter={(value) => `${value}%`} />
                <Tooltip 
                  formatter={(value: number) => [`${value.toFixed(2)}%`, "Değişim"]}
                  labelFormatter={(label) => `Ürün: ${label}`}
                />
                <Bar dataKey="value">
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <div className="overflow-x-auto rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ürün Kodu</TableHead>
              <TableHead>Ürün Adı</TableHead>
              <TableHead>Mağaza</TableHead>
              <TableHead>İlgili Ürün Grubu</TableHead>
              <TableHead className="text-right">Önceki Satış</TableHead>
              <TableHead className="text-right">Sonraki Satış</TableHead>
              <TableHead className="text-right">Değişim</TableHead>
              <TableHead className="text-right">Etki Puanı</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  Veri bulunamadı
                </TableCell>
              </TableRow>
            ) : (
              data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.productCode}</TableCell>
                  <TableCell>{item.productName}</TableCell>
                  <TableCell>{item.storeName}</TableCell>
                  <TableCell>{item.relatedProductGroup}</TableCell>
                  <TableCell className="text-right">
                    {item.salesBefore.toLocaleString("tr-TR")} ₺
                  </TableCell>
                  <TableCell className="text-right">
                    {item.salesAfter.toLocaleString("tr-TR")} ₺
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end">
                      {item.changePercentage >= 0 ? (
                        <ArrowUpRight className="h-4 w-4 mr-1 text-green-500" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 mr-1 text-red-500" />
                      )}
                      <span
                        className={
                          item.changePercentage >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {item.changePercentage >= 0 ? "+" : ""}
                        {item.changePercentage.toFixed(2)}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="inline-block bg-gray-100 px-2 py-1 rounded-md">
                      {item.impactScore.toFixed(1)}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DetayVeriTablosu;
