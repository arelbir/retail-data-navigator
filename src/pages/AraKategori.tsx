
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
import { Pencil, Trash2, Plus } from "lucide-react";

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
    <div className="container mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Ara Kategori Yönetimi</h1>
          <p className="text-muted-foreground mt-2">
            Ürünlere ait ara kategori bilgilerini ekleyin ve düzenleyin
          </p>
        </div>
        <Button onClick={handleAddNew} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Yeni Ekle
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Ara Kategori Listesi</CardTitle>
          <CardDescription>
            Sistemde kayıtlı olan tüm ara kategori tanımlamaları
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
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
                    Henüz kayıtlı ara kategori bulunmamaktadır
                  </TableCell>
                </TableRow>
              ) : (
                intermediateCategories.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.productCode}</TableCell>
                    <TableCell>{item.productName}</TableCell>
                    <TableCell>{item.intermediateCategory}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(item)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(item.id)}
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? "Ara Kategori Düzenle" : "Yeni Ara Kategori Ekle"}
            </DialogTitle>
            <DialogDescription>
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
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="productName">Ürün Adı</Label>
              <Input
                id="productName"
                value={currentItem.productName || ""}
                onChange={(e) => setCurrentItem({...currentItem, productName: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="intermediateCategory">Ara Kategori</Label>
              <Input
                id="intermediateCategory"
                value={currentItem.intermediateCategory || ""}
                onChange={(e) => setCurrentItem({...currentItem, intermediateCategory: e.target.value})}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              İptal
            </Button>
            <Button onClick={handleSave}>
              Kaydet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AraKategori;
