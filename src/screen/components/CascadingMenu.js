import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity,
  StyleSheet, Modal, ScrollView
} from 'react-native';

const CascadingMenu = ({ data, placeholder = 'Select...', onSelect }) => {
  const [visible, setVisible] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [selected, setSelected] = useState('');

  const handleChildSelect = (parent, child) => {
    const label = `${parent.label} → ${child.label}`;
    setSelected(label);
    setVisible(false);
    setHoveredItem(null);
    onSelect?.({ parent, child });
  };

  const handleParentSelect = (item) => {
    if (!item.children?.length) {
      setSelected(item.label);
      setVisible(false);
      setHoveredItem(null);
      onSelect?.({ parent: item, child: null });
    } else {
      setHoveredItem(hoveredItem?.value === item.value ? null : item);
    }
  };

  return (
    <View>
      {/* Trigger Button */}
      <TouchableOpacity
        style={styles.trigger}
        onPress={() => { setVisible(true); setHoveredItem(null); }}
      >
        <Text style={selected ? styles.selected : styles.placeholder}>
          {selected || placeholder}
        </Text>
        <Text style={styles.arrow}>▼</Text>
      </TouchableOpacity>

      {/* Modal Menu */}
      <Modal transparent visible={visible} animationType="fade"
        onRequestClose={() => { setVisible(false); setHoveredItem(null); }}>
        <TouchableOpacity style={styles.backdrop} activeOpacity={1}
          onPress={() => { setVisible(false); setHoveredItem(null); }}>

          <View style={styles.menuWrapper}>
            {/* Parent Menu */}
            <View style={styles.menu}>
              <ScrollView>
                {data.map((item) => (
                  <TouchableOpacity
                    key={item.value}
                    style={[
                      styles.menuItem,
                      hoveredItem?.value === item.value && styles.menuItemActive,
                    ]}
                    onPress={() => handleParentSelect(item)}
                  >
                    <Text style={[
                      styles.menuItemText,
                      hoveredItem?.value === item.value && styles.menuItemTextActive,
                    ]}>
                      {item.label}
                    </Text>
                    {item.children?.length > 0 && (
                      <Text style={styles.chevron}>›</Text>
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Child Menu */}
            {hoveredItem?.children?.length > 0 && (
              <View style={styles.subMenu}>
                <ScrollView>
                  {hoveredItem.children.map((child) => (
                    <TouchableOpacity
                      key={child.value}
                      style={styles.menuItem}
                      onPress={() => handleChildSelect(hoveredItem, child)}
                    >
                      <Text style={styles.menuItemText}>{child.label}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  trigger: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: '#F8FBFD', borderRadius: 30,
    borderWidth: 1, borderColor: '#E1EAF2',
    paddingHorizontal: 15, height: 60,
  },
  placeholder: { color: '#999', fontSize: 16, fontWeight: 'bold' },
  selected: { color: '#333', fontSize: 16, fontWeight: 'bold' },
  arrow: { color: '#888', fontSize: 12 },
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', padding: 20 },
  menuWrapper: { flexDirection: 'row', alignSelf: 'flex-start' },
  menu: {
    backgroundColor: '#2b2b2b', borderRadius: 8, minWidth: 200,
    paddingVertical: 4, elevation: 10,
    shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 10,
  },
  subMenu: {
    backgroundColor: '#2b2b2b', borderRadius: 8, minWidth: 180,
    paddingVertical: 4, marginLeft: 2, elevation: 10,
    shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 10,
  },
  menuItem: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 12,
  },
  menuItemActive: { backgroundColor: '#0078d4' },
  menuItemText: { color: '#fff', fontSize: 14 },
  menuItemTextActive: { color: '#fff' },
  chevron: { color: '#fff', fontSize: 18 },
});

export default CascadingMenu;