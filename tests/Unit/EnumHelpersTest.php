<?php

namespace Tests\Unit;

use App\Enums\UserStatus;
use PHPUnit\Framework\TestCase;

class EnumHelpersTest extends TestCase
{
    public function test_to_array_returns_correct_structure(): void
    {
        $result = UserStatus::toArray();

        $this->assertIsArray($result);
        $this->assertCount(4, $result);
        
        $expected = [
            ['value' => 'active', 'name' => 'ACTIVE', 'label' => 'アクティブ'],
            ['value' => 'inactive', 'name' => 'INACTIVE', 'label' => '非アクティブ'],
            ['value' => 'pending', 'name' => 'PENDING', 'label' => '承認待ち'],
            ['value' => 'suspended', 'name' => 'SUSPENDED', 'label' => '停止中'],
        ];

        $this->assertEquals($expected, $result);
    }

    public function test_get_values_returns_only_values(): void
    {
        $result = UserStatus::getValues();
        $expected = ['active', 'inactive', 'pending', 'suspended'];

        $this->assertEquals($expected, $result);
    }

    public function test_get_names_returns_only_names(): void
    {
        $result = UserStatus::getNames();
        $expected = ['ACTIVE', 'INACTIVE', 'PENDING', 'SUSPENDED'];

        $this->assertEquals($expected, $result);
    }

    public function test_get_labels_returns_only_labels(): void
    {
        $result = UserStatus::getLabels();
        $expected = ['アクティブ', '非アクティブ', '承認待ち', '停止中'];

        $this->assertEquals($expected, $result);
    }

    public function test_get_options_returns_value_label_pairs(): void
    {
        $result = UserStatus::getOptions();
        
        $expected = [
            ['value' => 'active', 'label' => 'アクティブ'],
            ['value' => 'inactive', 'label' => '非アクティブ'],
            ['value' => 'pending', 'label' => '承認待ち'],
            ['value' => 'suspended', 'label' => '停止中'],
        ];

        $this->assertEquals($expected, $result);
    }

    public function test_get_label_returns_correct_label(): void
    {
        $this->assertEquals('アクティブ', UserStatus::ACTIVE->getLabel());
        $this->assertEquals('非アクティブ', UserStatus::INACTIVE->getLabel());
        $this->assertEquals('承認待ち', UserStatus::PENDING->getLabel());
        $this->assertEquals('停止中', UserStatus::SUSPENDED->getLabel());
    }
}