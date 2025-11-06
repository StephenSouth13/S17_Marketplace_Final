import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Contact Submissions Management
      S.documentTypeListItem('contactSubmission').title('📧 Yêu Cầu Liên Hệ'),

      // Contact Person Management
      S.documentTypeListItem('contactPerson').title('👥 Người Liên Hệ'),

      // Rest of document types
      ...S.documentTypeListItems().filter(
        (item: any) => item.getId && item.getId() !== 'contactSubmission' && item.getId() !== 'contactPerson'
      ),
    ])
