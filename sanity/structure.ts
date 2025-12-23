import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // 1. Quản lý Yêu Cầu Liên Hệ (Dựa trên name: "contactSubmission")
      S.documentTypeListItem('contactSubmission').title('📧 Yêu Cầu Liên Hệ'),

      S.divider(), // Vạch ngăn cách

      // 2. Tự động hiển thị các loại tài liệu còn lại trừ contactSubmission
      ...S.documentTypeListItems().filter(
        (item: any) => 
          item.getId && 
          item.getId() !== 'contactSubmission'
      ),
    ])