'use client'
import { Select } from "@radix-ui/themes"

const LanguageSelector = () => {
  const languages = [
    { _id: 1, language: 'English' },
    { _id: 2, language: 'Hindi' },
    { _id: 3, language: 'Arabic' },
    { _id: 4, language: 'Spanish' },
  ]

  return (
    <div>
      <Select.Root defaultValue="English" size="3">
        <Select.Trigger />
        <Select.Content>
          <Select.Group>
            {languages.map(language => (
              <Select.Item key={language._id} value={language.language}>{language.language}</Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </div>
  )
}

export default LanguageSelector
