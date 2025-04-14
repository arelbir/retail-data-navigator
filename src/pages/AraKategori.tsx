
import { useData, IntermediateCategoryData } from "@/context/DataContext";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, ChevronRight, Layers, FileSpreadsheet } from "lucide-react";

const AraKategori = () => {
  const { 
    intermediateCategories, 
    addIntermediateCategory, 
    updateIntermediateCategory, 
    deleteIntermediateCategory 
  } = useData();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentItem, setCurrentItem] = useState<Partial<IntermediateCategoryData>>({});
  
  const handleAddNew = () => {
    setIsEditMode(false);
    setCurrentItem({
      productCode: "",
      productName: "",
      intermediateCategory: ""
    });
    setIsDialogOpen(true);
  };
  
  const handleEdit = (item: IntermediateCategoryData) => {
    setIsEditMode(true);
    setCurrentItem(item);
    setIsDialogOpen(true);
  };
  
  const handleDelete = (id: number) => {
    deleteIntermediateCategory(id);
    toast.success("Kayıt başarıyla silindi");
  };
  
  const handleSave = () => {
    if (!currentItem.productCode || !currentItem.productName || !currentItem.intermediateCategory) {
      toast.error("Lütfen tüm alanları doldurun");
      return;
    }
    
    if (isEditMode && currentItem.id) {
      updateIntermediateCategory(currentItem.id, {
        productCode: currentItem.productCode,
        productName: currentItem.productName,
        intermediateCategory: currentItem.intermediateCategory
      });
      toast.success("Kayıt başarıyla güncellendi");
    } else {
      addIntermediateCategory({
        productCode: currentItem.productCode || "",
        productName: currentItem.productName || "",
        intermediateCategory: currentItem.intermediateCategory || ""
      });
      toast.success("Yeni kayıt başarıyla eklendi");
    }
    
    setIsDialogOpen(false);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold">Ara Kategori Yönetimi</h1>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
            <span className="text-muted-foreground">Veri Listesi</span>
          </div>
          <p className="text-muted-foreground mt-1 text-sm">
            Ürünlere ait ara kategori bilgilerini ekleyin ve düzenleyin
          </p>
        </div>
        <Button onClick={handleAddNew} className="flex items-center gap-2 bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4" />
          Yeni Ekle
        </Button>
      </div>
      
      <Card className="border border-border/40 shadow-sm">
        <CardHeader className="bg-secondary/30 border-b border-border/30 pb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-md bg-primary/10">
              <Layers className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Ara Kategori Listesi</CardTitle>
              <CardDescription className="text-xs mt-1">
                Sistemde kayıtlı olan tüm ara kategori tanımlamaları
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <Table>
            <TableHeader className="bg-secondary/50">
              <TableRow>
                <TableHead>Ürün Kodu</TableHead>
                <TableHead>Ürün Adı</TableHead>
                <TableHead>Ara Kategori</TableHead>
                <TableHead className="text-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {intermediateCategories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <FileSpreadsheet className="h-10 w-10 text-muted-foreground/40" />
                      <span>Henüz kayıtlı ara kategori bulunmamaktadır</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                intermediateCategories.map((item) => (
                  <TableRow key={item.id} className="hover:bg-secondary/30">
                    <TableCell>{item.productCode}</TableCell>
                    <TableCell>{item.productName}</TableCell>
                    <TableCell>{item.intermediateCategory}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(item)}
                          className="h-8 w-8 p-0"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(item.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? "Ara Kategori Düzenle" : "Yeni Ara Kategori Ekle"}
            </DialogTitle>
            <DialogDescription className="text-xs">
              Ürün ve ara kategori bilgilerini girin ve kaydedin
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="productCode">Ürün Kodu</Label>
              <Input
                id="productCode"
                value={currentItem.productCode || ""}
                onChange={(e) => setCurrentItem({...currentItem, productCode: e.target.value})}
                className="h-9"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="productName">Ürün Adı</Label>
              <Input
                id="productName"
                value={currentItem.productName || ""}
                onChange={(e) => setCurrentItem({...currentItem, productName: e.target.value})}
                className="h-9"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="intermediateCategory">Ara Kategori</Label>
              <Input
                id="intermediateCategory"
                value={currentItem.intermediateCategory || ""}
                onChange={(e) => setCurrentItem({...currentItem, intermediateCategory: e.target.value})}
                className="h-9"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              İptal
            </Button>
            <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
              Kaydet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AraKategori;
