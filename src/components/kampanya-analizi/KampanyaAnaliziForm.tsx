
import { useState } from "react";
import { useData, FilterParams } from "@/context/DataContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

interface KampanyaAnaliziFormProps {
  initialParams: FilterParams;
  onSubmit: (params: FilterParams) => void;
  isLoading: boolean;
}

const KampanyaAnaliziForm = ({
  initialParams,
  onSubmit,
  isLoading,
}: KampanyaAnaliziFormProps) => {
  const { stores, products } = useData();
  const [formParams, setFormParams] = useState<FilterParams>(initialParams);
  const [productSearchText, setProductSearchText] = useState("");
  
  const filteredProducts = productSearchText
    ? products.filter(product => 
        product.name.toLowerCase().includes(productSearchText.toLowerCase()) ||
        product.id.toLowerCase().includes(productSearchText.toLowerCase())
      )
    : products;
  
  const handleTimeRangeChange = (values: number[]) => {
    setFormParams({
      ...formParams,
      timeRange: {
        start: values[0],
        end: values[1],
      },
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formParams);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mağaza Seçimi */}
        <div className="space-y-2">
          <Label htmlFor="store">Mağaza</Label>
          <Select
            value={formParams.store}
            onValueChange={(value) => 
              setFormParams({ ...formParams, store: value })
            }
          >
            <SelectTrigger id="store">
              <SelectValue placeholder="Mağaza seçin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Tüm Mağazalar</SelectItem>
              {stores.map((store) => (
                <SelectItem key={store.id} value={store.id}>
                  {store.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Ürün Seçimi */}
        <div className="space-y-2">
          <Label htmlFor="product">Ürün</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className="w-full justify-between"
                id="product"
              >
                {formParams.product 
                  ? products.find(p => p.id === formParams.product)?.name || "Ürün seçin" 
                  : "Ürün seçin"}
                <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
              <div className="p-2">
                <Input
                  placeholder="Ürün ara..."
                  value={productSearchText}
                  onChange={(e) => setProductSearchText(e.target.value)}
                  className="mb-2"
                />
              </div>
              <div className="max-h-60 overflow-y-auto">
                <div 
                  className="px-2 py-1.5 text-sm cursor-pointer hover:bg-secondary"
                  onClick={() => {
                    setFormParams({ ...formParams, product: "" });
                    setProductSearchText("");
                  }}
                >
                  Tüm Ürünler
                </div>
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className={cn(
                      "px-2 py-1.5 text-sm cursor-pointer hover:bg-secondary",
                      formParams.product === product.id ? "bg-secondary" : ""
                    )}
                    onClick={() => {
                      setFormParams({ ...formParams, product: product.id });
                      setProductSearchText("");
                    }}
                  >
                    <div className="font-medium">{product.name}</div>
                    <div className="text-xs opacity-70">{product.id}</div>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
        
        {/* Tarih Aralığı */}
        <div className="space-y-2">
          <Label>Tarih Aralığı</Label>
          <div className="grid grid-cols-2 gap-2">
            {/* Başlangıç Tarihi */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal",
                    !formParams.dateRange.start && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formParams.dateRange.start ? (
                    format(formParams.dateRange.start, "P", { locale: tr })
                  ) : (
                    "Başlangıç"
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formParams.dateRange.start || undefined}
                  onSelect={(date) =>
                    setFormParams({
                      ...formParams,
                      dateRange: { ...formParams.dateRange, start: date },
                    })
                  }
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
            
            {/* Bitiş Tarihi */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal",
                    !formParams.dateRange.end && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formParams.dateRange.end ? (
                    format(formParams.dateRange.end, "P", { locale: tr })
                  ) : (
                    "Bitiş"
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formParams.dateRange.end || undefined}
                  onSelect={(date) =>
                    setFormParams({
                      ...formParams,
                      dateRange: { ...formParams.dateRange, end: date },
                    })
                  }
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        {/* Saat Aralığı */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Saat Aralığı</Label>
            <span className="text-sm text-muted-foreground">
              {formParams.timeRange.start}:00 - {formParams.timeRange.end}:00
            </span>
          </div>
          <Slider
            defaultValue={[formParams.timeRange.start, formParams.timeRange.end]}
            max={24}
            min={0}
            step={1}
            onValueChange={handleTimeRangeChange}
          />
        </div>
        
        {/* İndirim Oranı */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>İndirim Oranı (%)</Label>
            <span className="text-sm text-muted-foreground">
              {formParams.discountPercentage}%
            </span>
          </div>
          <Slider
            defaultValue={[formParams.discountPercentage]}
            max={100}
            min={0}
            step={1}
            onValueChange={(values) =>
              setFormParams({ ...formParams, discountPercentage: values[0] })
            }
          />
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Yükleniyor..." : "Verileri Getir"}
        </Button>
      </div>
    </form>
  );
};

export default KampanyaAnaliziForm;
